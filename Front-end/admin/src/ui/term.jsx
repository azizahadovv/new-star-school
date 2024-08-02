import React from "react"

function Term({value,setValue}) {
  return (
    <select required={true} value={value} onChange={(e)=>setValue(e.target.value)} style={{height:"50px"}} className="form-select">
    <option hidden>Chorak</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
  </select>
  )
}

export default Term
