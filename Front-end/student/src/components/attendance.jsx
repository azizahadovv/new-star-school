import React from 'react'
import { Container, styleTopBarUI, styleTopBarUINoFlex } from '../constanta/style'
import { SELECTOPTIOS, TEACHERSELECT } from '../ui'

function Attendance() {
  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUI} px-4 w-full min-h-16`}>
        <div className='tablet:w-1/5 mobil:w-1/2 minMobil:w-full flex gap-2' l>
          <SELECTOPTIOS />
        </div>
        <div className='tablet:w-1/5 mobil:w-1/2 minMobil:w-full flex gap-2'>
          <TEACHERSELECT />
        </div>
      </div>

      <div className={`min-h-96 flex items-start justify-start ${styleTopBarUINoFlex} px-2 overflow-scroll`}>
        <table className="table table-hover cursor-pointer">
          <thead>
            <tr className='text-textGray'>
              <th>№</th>
              <th>Chorak</th>
              <th>Dars sanasi</th>
              <th>Fan nomi</th>
              <th>Sababli</th>
              <th>Vaqt</th>
              <th>Ustoz</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1-chorak</td>
              <td>20-05-2024 08:00</td>
              <td>Chet tili</td>
              <td>Ha</td>
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