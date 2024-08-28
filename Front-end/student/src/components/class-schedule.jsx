import { useEffect, useState } from "react"
import { styleTopBarUI, styleTopBarUINoFlex } from "../constanta/style"
import { CARDSCHEDULE, LOADER, SELECTTERMS } from "../ui"
import studentCotrol from '../service/student'


function ClassSchedule() {
    // Sahifa yangilanganida selectedOption qiymatini localStorage dan olish
    const [selectedOption, setSelectedOption] = useState(localStorage.getItem('selectedOption') || '')
    const [data, setData] = useState([])

    useEffect(() => {
        // selectedOption qiymati o'zgarganida yoki sahifa yangilanganida ma'lumotlarni olish
        getClassSchedule()
    }, [selectedOption])

    const getClassSchedule = async () => {
        const ids = localStorage.getItem('studentId')
        if (ids && selectedOption) {
            const datas = await studentCotrol.getStudentSchedule(ids, selectedOption)
            setData(datas)
        }
    }

    const handleOptionChange = (option) => {
        setSelectedOption(option)
        localStorage.setItem('selectedOption', option) // selectedOption qiymatini localStorage ga saqlash
    }

    return (
        <div className="w-full h-screen tablet:px-10 minMobil:px-1 ">
            <div className={`px-4 w-full min-h-16 ${styleTopBarUI}`}>
                <SELECTTERMS selectedOption={selectedOption} setSelectedOption={handleOptionChange} />
            </div>
            <div className={`${styleTopBarUINoFlex} w-full min-h-96 flex items-center justify-evenly flex-wrap gap-3 p-3 `}>
                {
                    data?.length === 0 ? <div>
                        <LOADER />
                    </div> :
                        data?.map((item, idx) => {
                            return <CARDSCHEDULE key={idx} weekDay={item?.dayOfWeek} data={item?.schedule} />
                        })
                }
            </div>
        </div>
    )
}

export default ClassSchedule
