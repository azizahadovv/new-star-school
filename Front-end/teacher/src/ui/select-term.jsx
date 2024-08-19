import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseURL } from '../service/api';

function SelectTerm({ selectedOption=1, setSelectedOption={} }) {

  const [terms, setTermas] = useState([])  ;

  useEffect(() => {
    gettermData()
    const savedOption = localStorage.getItem('term');
    if (savedOption) {
      setSelectedOption(savedOption);
    }
  }, []);

  function gettermData() {
    axios.get(`${baseURL}terms`).then((res) => {
      setTermas(res.data);
    })
  }

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelectedOption(newValue);
    localStorage.setItem('term', newValue);
  };


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