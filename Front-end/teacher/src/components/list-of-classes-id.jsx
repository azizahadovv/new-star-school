import { useEffect, useState } from 'react';
import { Container, styleTopBarUINoFlex } from '../constanta/style'
import { CLASSSCHEDULE, SELECTTERMS } from '../ui'
import { baseURL } from '../service/api';
import axios from 'axios';

function ListOfClassesID() {
  const [terms, setTermas] = useState([])
  const [selectedOption, setSelectedOption] = useState('');

  // On component mount, load the selected option from localStorage
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
    <div className={`${Container}`}>
      <div className={`${styleTopBarUINoFlex} h-20 flex items-center justify-start tablet:px-4 minMobil:px-2 overflow-scroll`}>
        <SELECTTERMS terms={terms} handleChange={handleChange} selectedOption={selectedOption} />
      </div>
      <div className={`${styleTopBarUINoFlex} min-h-96 p-3`}>
        <CLASSSCHEDULE  />
      </div>
    </div>
  )
}

export default ListOfClassesID