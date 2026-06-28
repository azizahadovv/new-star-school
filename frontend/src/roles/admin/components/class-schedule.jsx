import React, { useEffect, useState } from 'react'
import { Container } from '../constanta/style'
import { CARDCLASSES, LOADER } from '../ui'
import { useSelector } from 'react-redux'
import functionsClasses from '../service/function-class'
import { useTranslation } from 'react-i18next'

function ClassSchedule() {
  const { t } = useTranslation()
  const open = useSelector(sel => sel.sidebarReduser.open)
  const [schedule, setSchedule] = useState([])
  useEffect(() => {
    getClass()
  }, [])

  const getClass = async () => {
    try {
      const schedule = await functionsClasses.getClasses()
      setSchedule(schedule);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={`${Container} ${open ? 'hidden' : 'flex'}`}>
      {
        schedule?.length === 0 ? <div>
          <h1>{t('no_date')}</h1>
        </div> : <div className=' w-full flex items-start minMobil:justify-center content-start tablet:justify-start flex-wrap gap-4 minMobil:px-2'>
          {
            schedule.map(item => (
              <CARDCLASSES key={item.id} data={item} />
            ))
          }
        </div>
      }

    </div>
  )
}

export default ClassSchedule