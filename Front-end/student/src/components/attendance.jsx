import React, { useEffect, useState } from 'react';
import { Container, styleTopBarUI, styleTopBarUINoFlex } from '../constanta/style'
import { SELECTOPTIOS, SELECTTERMS, TEACHERSELECT } from '../ui'
import { useTranslation } from 'react-i18next'
import GradeCotrol from '../service/grade';

function Attendance() {
  const { t } = useTranslation()

  // Sahifa yangilanganda qiymatlarni localStorage dan olish
  const [termData, setTermData] = useState(localStorage.getItem('termData') || '');
  const [valueTeacher, setValueTeacher] = useState(localStorage.getItem('valueTeacher') || '');
  const [teacherData, setTeacherData] = useState([])
  const [newData, setNewData] = useState([])

  useEffect(() => {
    getData();
  }, [termData, valueTeacher]); // termData va valueTeacher o'zgarganida getData qayta ishga tushadi

  const getData = async () => {
    const id = sessionStorage.getItem('my-users-ids')
    const data = await GradeCotrol.getTerms(id, termData, 'ATTENDANCE', valueTeacher)
    setNewData(data);
  }

  const handleTermChange = (newTerm) => {
    setTermData(newTerm);
    localStorage.setItem('termData', newTerm); // termData'ni localStorage ga saqlash
  }

  const handleTeacherChange = (newTeacher) => {
    setValueTeacher(newTeacher);
    localStorage.setItem('valueTeacher', newTeacher); // valueTeacher'ni localStorage ga saqlash
  }

  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUI} px-4 py-2 w-full min-h-16`}>
        <div className='tablet:w-1/5 mobil:w-1/2 minMobil:w-full flex gap-2'>
          <SELECTTERMS selectedOption={termData} setSelectedOption={handleTermChange} />
        </div>
        <div className='tablet:w-1/5 mobil:w-1/2 minMobil:w-full flex gap-2'>
          <SELECTOPTIOS teacherData={teacherData} setTeacherData={setTeacherData} />
        </div>
        <div className='tablet:w-1/5 mobil:w-1/2 minMobil:w-full flex gap-2'>
          <TEACHERSELECT value={valueTeacher} setValue={handleTeacherChange} teacherData={teacherData} />
        </div>
      </div>

      <div className={`min-h-96 flex items-start justify-start ${styleTopBarUINoFlex} px-2 overflow-scroll`}>
        {
          newData?.length === 0 ? <div className='w-full flex items-center justify-center min-h-52'>
            <h1>{t("no_data")}</h1>
          </div> : <table className="table table-hover cursor-pointer">
            <thead>
              <tr className='text-textGray capitalize'>
                <th>№</th>
                <th>{t("term")}</th>
                <th>{t("date_lesson")}</th>
                <th>{t("name_lesson")}</th>
                <th>{t("teachers_name")}</th>
              </tr>
            </thead>
            <tbody>
              {newData?.map((item, index) => (
                <tr key={index} >
                  <td>{index + 1}</td>
                  <td>{item?.termName}</td>
                  <td>{item?.dateAssigned}</td>
                  <td>{item?.subjectName}</td>
                  <td>{item?.teacherName}</td>
                </tr>
              ))
              }
            </tbody>
          </table>

        }

      </div>
    </div >
  )
}

export default Attendance;
