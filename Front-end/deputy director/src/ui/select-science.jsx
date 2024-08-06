import { useEffect, useState } from "react";
import subjectFunction from "../service/subjects";
import { useTranslation } from "react-i18next";

function SelectScience({ value, setValue }) {
  const [subject, setSubject] = useState([])
  const {t}=useTranslation()
  useEffect(() => {
    getSubjectFunction()
  }, [])

  const getSubjectFunction = async () => {
    const response = await subjectFunction.getSubjects()
    setSubject(response)
  }
  return (
    <select value={value} onChange={(e) => setValue(e?.target.value)} className="form-select w-100">
      <option hidden>{t("select_science")}</option>
      <option value="">{t("all_science")}</option>
      {
        subject.map((item) => (
          <option key={item.id} value={item?.id}>{item?.name}</option>
        ))
      }
    </select>
  );
}

export default SelectScience;
