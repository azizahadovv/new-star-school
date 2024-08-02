import React from "react";

function SelectTeacher({ value, setValue, teacherData }) {
  return (
    <select
      required={true}
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      style={{ height: "50px" }}
      className="form-select"
    >
      <option hidden>O'qituvchini tanlang</option>
      {teacherData.length === 0 ? (
        <option>Loading..</option>
      ) : (
        teacherData?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.firstName} {item.lastName}
          </option>
        ))
      )}
    </select>
  );
}

export default SelectTeacher;
