import React, { useEffect, useState } from 'react';
import { Container, styleTopBarUI, styleTopBarUINoFlex } from '../constanta/style'
import { SELECTOPTIOS, TEACHERSELECT } from '../ui'
import { useTranslation } from 'react-i18next'
function Attendance() {
  const { t } = useTranslation()
  const [teacherData, setTeacherData] = useState([])
  const [valueTeacher, setValueTeacher] = useState('')



  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUI} px-4 w-full min-h-16`}>
        <div className='tablet:w-1/5 mobil:w-1/2 minMobil:w-full flex gap-2'>
          <SELECTOPTIOS teacherData={teacherData} setTeacherData={setTeacherData} />
        </div>
        <div className='tablet:w-1/5 mobil:w-1/2 minMobil:w-full flex gap-2'>
          <TEACHERSELECT teacherData={teacherData} />
        </div>
      </div>

      <div className={`min-h-96 flex items-start justify-start ${styleTopBarUINoFlex} px-2 overflow-scroll`}>
        <table className="table table-hover cursor-pointer">
          <thead>
            <tr className='text-textGray'>
              <th>№</th>
              <th>{t("term")}</th>
              <th>{t("date_lesson")}</th>
              <th>{t("name_lesson")}</th>
              <th>{t("lesson_duration")}</th>
              <th>{t("teachers_name")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1-chorak</td>
              <td>20-05-2024 08:00</td>
              <td>Chet tili</td>
              <td>45 daqiqa</td>
              <td>Xurshida Umirzaqova</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Attendance