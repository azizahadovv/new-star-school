import { useTranslation } from "react-i18next"
import subjectsCotrol from "../service/subjects"
import { useEffect, useState } from "react"

function OptionsSelect() {
    const { t } = useTranslation()
    const [datas, setDatas] = useState([])

    useEffect(() => {
        getDataSubjects()
    }, [])

    const getDataSubjects = async () => {
        const data = await subjectsCotrol.getSubjects()
        setDatas(data);
    }


    return (
        <select className="form-select" aria-label="Disabled select example">
            <option hidden>{t("subject_name")}</option>
            {
                datas?.map((d) => {
                    return <option key={d.id} value={d.id}>{d.name}</option>
                })
            }
        </select>
    )
}

export default OptionsSelect