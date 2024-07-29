import { useEffect, useState } from "react";
import subjectFunction from "../service/subjects";

function SelectScience() {
  const [subject, setSubject] = useState([])
  useEffect(() => {
    getSubjectFunction()
   }, [])

   const getSubjectFunction = async () => {
    const response = await subjectFunction.getSubjects()
    setSubject(response)
  }
  return (
    <select className="form-select">
      <option hidden>Fanni tanlang</option>
      <option value="all">Hammasi</option>
      {
        subject.map((item) => (
          <option key={item.id} value={item.name}>{item.name}</option>
        ))
      }
    </select>
  );
}

export default SelectScience;
