import React from "react";

function SelectClassGroup({ setClassesGroup }) {
  return (
    <select
      onChange={(e) => setClassesGroup(e.target.value)}
      className="form-select w-50"
      aria-label="Default select example"
    >
      <option hidden>Sinf tanlang</option>
      <option defaultValue="a">A</option>
      <option value="b">B</option>
      <option value="c">C</option>
      <option value="d">D</option>
      <option value="e">E</option>
      <option value="f">F</option>
    </select>
  );
}

export default SelectClassGroup;
