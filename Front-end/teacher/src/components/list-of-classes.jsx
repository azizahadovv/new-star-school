import { useEffect, useState } from "react"
import { Container } from "../constanta/style"
import { CARDCLASSES } from "../ui"
import teacherClass from "../service/teacher-class"


function ListOfClasses() {
  const [datas, setDatas] = useState([])
  useEffect(() => {
    data()
  }, [])

  const data = async () => {
    const data = await teacherClass.myClasses('1')
    setDatas(data);
    console.log(data);
  }

  return (
    <div className={`${Container} py-5 flex items-start content-start minMobil:justify-center tablet:justify-start flex-wrap gap-4 minMobil:px-2`}>
      {
        datas.length === 0 ? <h1>Lorem ipsum dolor sit amet.</h1> : datas.map(item => <CARDCLASSES key={item.id} data={item} />)
      }
    </div>
  )
}

export default ListOfClasses