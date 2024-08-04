import React, { useEffect, useState } from "react";
import functionsClasses from "../service/function-class";
import { useTranslation } from "react-i18next";

function SelectClassNumber({ setClassesNumber, classesNumber }) {
  const [classNumber, setclassNumber] = useState([])
  const {t}=useTranslation()
  useEffect(() => {
    getClassesNumber()
  }, [])
  const getClassesNumber = async () => {
    try {
      const getdataclassNumber = await functionsClasses.getClasses()
      setclassNumber(getdataclassNumber);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <select
      value={classesNumber}
      onChange={(e) => setClassesNumber(e.target.value)}
      className="form-select w-50"
    >
      <option value={""}>{t("All_student_select")}</option>
      {
        classNumber == [] ? <option>Loading...</option> : classNumber.map((i) => {
          return <option key={i.id} value={i.id}>{i.name}</option>
        })
      }
    </select>
  );
}

export default SelectClassNumber;
