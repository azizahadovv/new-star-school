import React from "react";

function SelectClassNumber({ setClassesNumber, classesNumber }) {
  return (
    <select
      value={classesNumber}
      onChange={(e) => setClassesNumber(e.target.value)}
      className="form-select w-50"

    >
      <option hidden>Sinf tanlang</option>
      <option value="1">1-sinf</option>
      <option value="2">2-sinf</option>
      <option value="3">3-sinf</option>
      <option value="4">4-sinf</option>
      <option value="5">5-sinf</option>
      <option value="6">6-sinf</option>
      <option value="7">7-sinf</option>
      <option value="8">8-sinf</option>
      <option value="9">9-sinf</option>
      <option value="10">10-sinf</option>
      <option value="11">11-sinf</option>
    </select>
  );
}

export default SelectClassNumber;
