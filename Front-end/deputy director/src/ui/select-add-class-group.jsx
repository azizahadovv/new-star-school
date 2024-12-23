import React from "react";

function SelectClassGroup({ setClassesGroup, classesGroup }) {
  return (
    <select
      value={classesGroup}
      onChange={(e) => setClassesGroup(e.target.value)}
      className="form-select w-50"
    
    >
      <option hidden>Sinf tanlang</option>
      <option value="a">A</option>
      <option value="b">B</option>
      <option value="c">C</option>
      <option value="d">D</option>
      <option value="e">E</option>
      <option value="f">F</option>
    </select>
  );
}

export default SelectClassGroup;
