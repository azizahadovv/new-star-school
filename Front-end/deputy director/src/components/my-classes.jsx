import { useEffect, useState } from 'react'
import { Container, styleTopBarUI } from '../constanta/style'
import { } from './index'
import { CARDCLASSES } from '../ui'
import functionsClasses from '../service/function-class'

function MyClasses() {
  const [data, setData] = useState([])
  useEffect(() => {
    getClass()
  }, [])

  const getClass = async () => {
    const schedule = await functionsClasses.getClasses()
    setData(schedule);
  }


  return (
    <div className={`${Container}`}>
      <div className={`flex content-start px-3 py-5 min-h-96 gap-5`}>
        {
          data.map((item, index) => {
            return <CARDCLASSES key={index} data={item} />
          })
        }
      </div>
    </div>
  )
}

export default MyClasses
