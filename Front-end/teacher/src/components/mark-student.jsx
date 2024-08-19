import React, { useEffect, useState } from 'react'
import { Container, styleTopBarUINoFlex } from '../constanta/style'
import { useParams } from 'react-router-dom'
import MarkClass from '../service/mark'
import { SELECTTERMS } from '../ui'
import { useTranslation } from 'react-i18next'
function MarkStudents() {
  const [selectedOption, setSelectedOption] = useState('')
  const [datas, setDatas] = useState([])
  const { id } = useParams()
  const {t}=useTranslation()

  useEffect(() => {
    getMarkData()
  }, [selectedOption, id])
  const getMarkData = async () => {
    const datas = await MarkClass.getMarks(1, 1, id, selectedOption)
    setDatas(datas)
  }


  const dates = datas.map(item => item.date);

  // Create a list of unique students
  const students = Array.from(
    new Set(datas.flatMap(item => item.grades.map(grade => grade.studentName)))
  );

  // Create a helper function to get the grade for a specific student and date
  const getGrade = (studentName, date) => {
    const dateData = datas?.find(d => d.date === date);
    const studentGrade = dateData?.grades.find(g => g.studentName === studentName);
    return studentGrade ? studentGrade.gradeValue : '';
  };

  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUINoFlex} min-h-20 flex items-center justify-start px-3`}>
        <SELECTTERMS selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      </div>
      <div className={`${styleTopBarUINoFlex} min-h-96 p-3`}>
        {datas.length !== 0 ? <table className="teble">
          <thead className='table-hover'>
            <tr>
              <th className="py-2 px-4 border-b">№</th>
              <th className="py-2 px-4 border-b">{t("table_pupils")}</th>
              {dates?.map((date, index) => (
                <th key={index} className="py-2 px-4 border-b">{date}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students?.map((student, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{index+1}</td>
                <td className="py-2 px-4 border-b">{student}</td>
                {dates?.map((date, i) => (
                  <td key={i} className="py-2 px-4 border-b text-center">
                    {getGrade(student, date)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table> : <div className='w-full h-full flex items-center justify-center mt-5 text-3xl'>{t("no_date")}</div>}
      </div>
    </div>
  )
}

export default MarkStudents
