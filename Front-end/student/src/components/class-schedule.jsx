import { useEffect, useState } from "react"
import { styleTopBarUI, styleTopBarUINoFlex } from "../constanta/style"
import { ButtonFrameSection, CARDSCHEDULE, LOADER } from "../ui"
import studentCotrol from '../service/student'

function ClassSchedule() {
    const [data, setData] = useState([])
    useEffect(() => {
        getClassSchedule()
    }, [])

    const getClassSchedule = async () => {
        const datas = await studentCotrol.getStudentSchedule()
        setData(datas);
        console.log(datas);
    }

    return (
        <div className="w-full h-screen tablet:px-10 minMobil:px-1 ">
            <div className={`px-4 w-full min-h-16 ${styleTopBarUI}`}>
                <ButtonFrameSection nameBtn={"1-chorak"} active={true} />
                <ButtonFrameSection nameBtn={"2-chorak"} />
                <ButtonFrameSection nameBtn={"3-chorak"} />
                <ButtonFrameSection nameBtn={"4-chorak"} />
            </div>
            <div className={`${styleTopBarUINoFlex} w-full min-h-96 flex items-center justify-evenly flex-wrap gap-3 p-3 `}>
                {
                    data.length == 0 ? <div>
                        <LOADER />
                    </div> :
                        data.map((item, idx) => {
                            return <CARDSCHEDULE key={idx} weekDay={item.dayOfWeek} data={item.schedule} />
                        })
                }
            </div>
        </div>
    )
}

export default ClassSchedule