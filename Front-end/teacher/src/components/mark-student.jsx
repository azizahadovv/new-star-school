import React, { useEffect, useState } from 'react'
import { Container, styleTopBarUINoFlex } from '../constanta/style'
import { useParams } from 'react-router-dom'
import MarkClass from '../service/mark'
import { SELECTTERMS } from '../ui'
function MarkStudents() {
  const [selectedOption, setSelectedOption] = useState('')

  const [datas, setDatas] = useState([])
  const [grades, setGrades] = useState([])
  const { id } = useParams()

  useEffect(() => {
    getMarkData()
  }, [selectedOption, id])
  const getMarkData = async () => {
    const datas = await MarkClass.getMarks(1, 1, id, selectedOption)
    setDatas(datas)
console.log(datas);
  }

  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUINoFlex} min-h-20 flex items-center justify-start px-3`}>
        <SELECTTERMS selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      </div>
      <div className={`${styleTopBarUINoFlex} min-h-96 p-3`}>
        <table className='table table-hover '>
          <thead>
            {
              <tr>
                <th>Id</th>
                <th>Name</th>
                {
                  datas?.map((item, idx) => {
                    return <th key={idx}>{item.date}</th>
                  })
                }
              </tr>
            }
          </thead>
          <tbody>
            {
              datas?.map((item) => {
                return item.grades.map((grade, idx) => {
                  return <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{grade.studentName}</td>
                    <td>{grade.gradeValue}</td>
                  </tr>
                })
              })

            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MarkStudents
