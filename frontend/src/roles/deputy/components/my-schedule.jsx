import React, { useEffect, useState } from 'react'
import { CARDSCHEDULE, LOADER, TERM } from '../ui'
import { styleTopBarUI, styleTopBarUINoFlex } from '../constanta/style'
import TimeTable from '../service/time-table'

function MySchedule() {
  const [datas, setDatas] = useState([])
  const [selectedOption, setSelectedOption] = useState(localStorage.getItem('selectedOption') || '1')

  useEffect(() => {
    localStorage.setItem('selectedOption', selectedOption)
    getDatas()
  }, [selectedOption])

  const getDatas = async () => {
    const ids = sessionStorage.getItem('my-users-ids')
    const datas = await TimeTable.myClasses(ids, selectedOption)
    setDatas(datas)
  }

  return (
    <div className="w-full h-screen tablet:px-10 minMobil:px-1">
      <div className={`px-4 w-full min-h-16 ${styleTopBarUI}`}>
        <TERM selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      </div>
      <div className={`${styleTopBarUINoFlex} w-full min-h-96 flex items-center justify-evenly flex-wrap gap-3 p-3`}>
        {
          datas?.length === 0 ? <div>
            <LOADER />
          </div> :
            datas?.map((item, idx) => {
              return <CARDSCHEDULE key={idx} weekDay={item?.dayOfWeek} data={item?.schedule} />
            })
        }
      </div>
    </div>
  )
}

export default MySchedule