import { useEffect, useState } from 'react'
import { Container } from '../constanta/style'
import { } from './index'
import { CARDCLASSES } from '../ui'
import teacherController from '../service/teacher'

function MyClassesId() {
  const id = sessionStorage.getItem('my-users-ids');
  const [data, setData] = useState([])

  useEffect(() => {
    getClass()
  }, [id])

  const getClass = async () => {
    const schedule = await teacherController.getClassesInTeacherId(id)
    setData(schedule);
  }
  return (
    <div className={`${Container}`}>
      <div className={`flex content-start items-center tablet:justify-start minMobil:justify-center flex-wrap gap-3 col-span-3`}>
        {
          data?.map((item, index) => {
            return <CARDCLASSES key={index} data={item} />
          })
        }
      </div>
    </div>
  )
}

export default MyClassesId
