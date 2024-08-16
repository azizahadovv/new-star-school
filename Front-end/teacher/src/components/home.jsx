import React from 'react'
import { Container } from '../constanta/style'
import { homeCard } from '../constanta/const'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div className={`p-6 min-h-[360px] rounded-lg ${Container} flex flex-wrap gap-4 tablet:items-start tablet:justify-start minMobil:items-center minMobil:justify-center`}>
      {
        homeCard.map(item => <NavLink
          title={item.title}
          to={item.link}
          key={item.id}
          className='shadow-home-page rounded-xl flex flex-col items-center justify-center gap-3 tablet:w-64 tablet:h-64 minMobil:w-72 minMobil:h-72 no-underline'
        >
          <img className='w-50' src={item.img} alt="" />
          <h3 className='w-44 text-center'>{item.title}</h3>
        </NavLink>)
      }
    </div>
  )
}

export default Home