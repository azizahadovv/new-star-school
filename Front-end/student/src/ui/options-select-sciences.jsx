import { useTranslation } from "react-i18next"
import subjectsCotrol from "../service/subjects"
import { useEffect, useState } from "react"
import teachersCotrol from "../service/teachers"

function OptionsSelect({ setTeacherData }) {
    const { t } = useTranslation()
    const [datas, setDatas] = useState([])
    const [val, setVal] = useState('')

    useEffect(() => {
        getDataSubjects()
        getTeacherData()
    }, [])

    const getDataSubjects = async () => {
        const data = await subjectsCotrol.getSubjects()
        setDatas(data);
    }

    const getTeacherData = async (id) => {
        const ids = id === undefined ? "" : id
        const datas = await teachersCotrol.getTeachers(ids)
        setTeacherData(datas);
    }

    return (
        <select value={val} onChange={(e) => {
            setVal(e.target.value)
            getTeacherData(e.target.value)
        }} style={{ height: "35px" }} className="form-select" >
            <option value={''}>{t("all")}</option>
            {
                datas?.map((d) => {
                    return <option key={d.id} value={d.id}>{d.name}</option>
                })
            }
        </select>
    )
}

export default OptionsSelect