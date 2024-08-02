import { useEffect, useState } from "react";
import subjectFunction from "../service/subjects";
import teacherController from "../service/teacher";

function SubjecdtInId({ value, setValue, setTeacherData }) {
  const [subject, setSubject] = useState([]);
  useEffect(() => {
    getSubjectFunction();
  }, []);
  const getSubjectFunction = async () => {
    const response = await subjectFunction.getSubjects();
    setSubject(response);
  };

  const getTeacherInSubjectId = async (e) => {
    try {
      if (e !== "") {
        const data = await teacherController.getTeacherInSubjectId(e);
        setTeacherData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <select required={true}
      value={value}
      onChange={(e) => {
        getTeacherInSubjectId(e.target.value);
        setValue(e.target.value);
      }}
      style={{ height: "50px" }}
      className="form-select m-0"
    >
      <option value="" hidden>Fanni tanlang</option>
      <option>Hammasi</option>
      {subject.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}

export default SubjecdtInId;
