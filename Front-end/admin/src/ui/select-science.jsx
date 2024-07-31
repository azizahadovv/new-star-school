import { useEffect, useState } from "react";
import subjectFunction from "../service/subjects";

function SelectScience({ value, setValue }) {
  const [subject, setSubject] = useState([])
  useEffect(() => {
    getSubjectFunction()
  }, [])

  const getSubjectFunction = async () => {
    const response = await subjectFunction.getSubjects()
    setSubject(response)
  }
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)} className="form-select">
      <option hidden>Fanni tanlang</option>
      <option value="">Hammasi</option>
      {
        subject.map((item) => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))
      }
    </select>
  );
}

export default SelectScience;
