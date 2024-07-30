import React, { useEffect, useState } from "react";
import functionsClasses from "../service/function-class";
import { LOADER } from ".";

function SelectClassNumber({ setClassesNumber, classesNumber }) {
  const [classNumber, setclassNumber] = useState([])
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
      <option hidden>Sinf tanlang</option>
      <option value={""}>All Students</option>

      {
        classNumber == [] ? <option>Loading...</option> : classNumber.map((i) => {
          return <option key={i.id} value={i.id}>{i.name}</option>
        })
      }
    </select>
  );
}

export default SelectClassNumber;
