import { useTranslation } from "react-i18next"
import subjectsCotrol from "../service/subjects"
import { useEffect, useState } from "react"


function OptionsSelectSiences({ value, setVals }) {
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
        <select value={value} onChange={(e) => { setVals(e.target.value) }} className="form-select" aria-label="Disabled select example">
            <option value={''}>{t("all")}</option>
            {
                datas?.map((d) => {
                    return <option key={d.id} value={d.id}>{d.name}</option>
                })
            }
        </select>
    )
}

export default OptionsSelectSiences