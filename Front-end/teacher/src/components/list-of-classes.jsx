import { useEffect, useState } from "react"
import { Container } from "../constanta/style"
import { CARDCLASSES, LOADER } from "../ui"
import teacherClass from "../service/teacher-class"


function ListOfClasses() {
  const [datas, setDatas] = useState([])
  const teacherId = sessionStorage.getItem('my-users-ids')
  useEffect(() => {
    data()
  }, [])

  const data = async () => {
    const data = await teacherClass.myClasses(teacherId)
    setDatas(data);
  }

  return (
    <div className={`${Container} py-5 flex items-start content-start minMobil:justify-center tablet:justify-start flex-wrap gap-4 minMobil:px-2`}>
      {
        datas?.length === 0 ? <div className="w-full min-h-96 flex items-center justify-center">
          <LOADER />
        </div> : datas?.map(item => <CARDCLASSES key={item.id} data={item} />)
      }
    </div>
  )
}

export default ListOfClasses