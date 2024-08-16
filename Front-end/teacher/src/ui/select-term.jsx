import React from 'react'

function SelectTerm({terms,handleChange,selectedOption}) {
  return (
    <select
      style={{ width: "350px" }}
      id="options"
      value={selectedOption}
      onChange={handleChange}
      className="form-select"
    >
      {
        terms?.map((item) => {
          return <option key={item.id} value={item.id} >{item.name}</option>
        })
      }
    </select>
  )
}

export default SelectTerm