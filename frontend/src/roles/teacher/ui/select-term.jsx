
import React, { useEffect, useState } from 'react'
import TermControl from '../service/term';

function SelectTerm({ selectedOption = 1, setSelectedOption = {} }) {

  const [terms, setTermas] = useState([]);

  useEffect(() => {
    gettermData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gettermData = async () => {
    const datas = await TermControl.myTerm()
    setTermas(datas);
    // Default term avto-tanlash (sahifa bo'sh ochilmasligi uchun)
    if (!selectedOption && datas?.length) {
      const saved = localStorage.getItem('term');
      const def = saved || String(datas[0]?.id);
      if (def) {
        setSelectedOption(def);
        localStorage.setItem('term', def);
      }
    }
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
          return <option key={item.id} value={item?.id} >{item.name}</option>
        })
      }
    </select>
  )
}

export default SelectTerm