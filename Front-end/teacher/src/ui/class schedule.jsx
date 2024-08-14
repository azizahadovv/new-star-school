import { useParams } from "react-router-dom"
import { bgLightGray, bgLightGrayMark } from "../constanta/style"
import classInId from "../service/class-in-id"
import { useEffect, useState } from "react"

function ClassSchedule() {
    const { id } = useParams()
    const [studentsData, setStudentsData] = useState([])
    const data = `${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}`

    useEffect(() => {
        students()
    }, [])

    const students = async () => {
        const datas = await classInId.myClasses(id)
        setStudentsData(datas.students);
    }





    return (
        <div className="w-full overflow-scroll">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>
                            №
                        </th>
                        <th>
                            O‘quvchilar
                        </th>
                        <th>
                            <div className={`${bgLightGray} border-t-blue no-underline outline-none`} >{data}</div>
                        </th>
                      
                    </tr>
                </thead>
                <tbody>
                    {
                        studentsData.map((item, id) => {
                            return <tr key={id}>
                                <td>{id + 1}</td>
                                <td className="w-25">
                                    <div className="min-w-[250px] flex gap-2 items-center">
                                        <img className="rounded-full w-[40px] h-[40px] border border-brGray flex items-center justify-center" hidden={item.image !== null ? false : true} src={item.image} alt="..." />
                                        <span>{item.lastName + " " + item.firstName + " " + item.patronymic}</span>
                                    </div>
                                </td>
                                <td>
                                    <input value={5} className={`${bgLightGrayMark} no-underline outline-none`} />
                                </td>
                             
                            </tr>
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default ClassSchedule