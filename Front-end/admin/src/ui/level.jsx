import React from "react";

function Level({
  level,
  setLevel,
  style = { height: "55px", maxWidth: "350px" },
}) {
  return (
    <select
      value={level}
      onChange={(e) => setLevel(e.target.value)}
      required
      className="form-select"
      style={style}
    >
      <option hidden>Lavozimi *</option>
      <option selected value="TEACHER">
        Oddiy o'qituvchi
      </option>
      <option value="DEPUTY_DIRECTOR">Director o'rinbosari</option>
      <option value="DIRECTOR">Director</option>
      <option value="ADMIN">Admin</option>
    </select>
  );
}

export default Level;
