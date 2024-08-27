import { useEffect, useState } from "react";
import subjectFunction from "../service/subjects";
import teacherController from "../service/teacher";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SubjecdtInId({ value, setValue, setTeacherData, startTime, endTime, weekDay }) {
  const [subject, setSubject] = useState([]);
  const { t } = useTranslation()
  const { id } = useParams()
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
        const data = await teacherController.getTeacherInSubjectIdAndChaced(weekDay, startTime, endTime, e);
        setTeacherData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const path = window.location.pathname
  const xyz = path === `/class-schedule/${id}`
  return (
    <select
      required={true}
      value={value}
      onChange={(e) => {
        getTeacherInSubjectId(e.target.value);
        setValue(e.target.value);
      }}
      style={{ height: "50px" }}
      className="form-select m-0"
    >
      <option hidden>{t("select_science")}</option>
      <option hidden={xyz && true} value={''}>{t("all_science")}</option>
      {subject?.map((item) => (
        <option key={item?.id} value={item?.id}>
          {item?.name}
        </option>
      ))}
    </select>
  );
}

export default SubjecdtInId;
