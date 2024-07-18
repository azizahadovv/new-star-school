import React from 'react'
import { Container } from '../constanta/style'
import { useSelector } from 'react-redux'

function Home() {
  const open = useSelector(sel => sel.sidebarReduser.open)
  return (
    <div className={`p-6 min-h-[360px] rounded-lg ${Container} ${open ? 'hidden' : 'flex'}`}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa veritatis voluptate asperiores eveniet eum officiis itaque aperiam, voluptatibus esse nisi similique ipsum repellendus blanditiis architecto veniam mollitia accusantium! Unde, et!xit neque
    </div>
  )
}

export default Home