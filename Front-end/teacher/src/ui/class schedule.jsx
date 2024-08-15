import { useParams } from "react-router-dom"
import { bgLightGray, bgLightGrayMark } from "../constanta/style"
import classInId from "../service/class-in-id"
import { useEffect, useState } from "react"

function ClassSchedule() {
    const { id } = useParams()
    const [studentsData, setStudentsData] = useState([])
    const [studentsMark, setstudentsMark] = useState([])
    const [studentsMarkIs, setstudentsMarkIs] = useState('')

    const date = `${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + new Date().getDate()).slice(-2) + " " + new Date().getHours() + ":" + new Date().getMinutes()}`
    const teacherId = 1;

    useEffect(() => {
        students()
    }, [])
    console.log(date);
    const students = async () => {
        const datas = await classInId.myClasses(id)
        setStudentsData(datas.students);
    }
    console.log(studentsMark);
    function studentChangeValue(studentId, gradeValue) {
        setstudentsMarkIs(gradeValue)
        if (!studentsMark[studentId]) {
            studentsMark[studentId] = {
                "studentId": studentId,
                "teacherId": teacherId,
                "subjectId": 0,
                "termId": 1,
                "schoolClassId": id,
                "gradeValue": gradeValue,
                "dateAssigned": date
            };
        } else {
            studentsMark[studentId].gradeValue = gradeValue;
        }
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
                            <div className={`${bgLightGray} border-t-blue no-underline outline-none flex items-center justify-center`} >{date}</div>
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
                                    <select style={{ width: "150px" }} value={studentsMark[item.id]?.gradeValue ?? ''} onChange={(e) => studentChangeValue(item.id, e.target.value)} id={item.id} className="form-select">
                                        <option value={''} hidden>Baholash</option>
                                        <option value={'present'}>Darsda bor</option>
                                        <option value={'sababli'}>Sababli</option>
                                        <option value={'sababsiz'}>Sababsiz</option>
                                        <option value={'5'}>5</option>
                                        <option value={'4'}>4</option>
                                        <option value={'3'}>3</option>
                                        <option value={'2'}>2</option>
                                    </select>
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



{/* <input value={studentsMark[item.id]?.gradeValue ?? ''} onChange={(e) => studentChangeValue(item.id, e.target.value)} className={`${bgLightGrayMark} no-underline outline-none`} /> */ }
