import React from 'react'
import { Container } from '../constanta/style'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { homeCard } from '../constanta/const'

function Home() {
  const { t } = useTranslation()
  return (
    <div className={`p-6 min-h-[360px] rounded-lg ${Container} flex flex-wrap gap-4 tablet:items-start tablet:justify-start minMobil:items-center minMobil:justify-center`}>
      {
        homeCard.map(item => <Link
          title={t(item.title)}
          to={item.path}
          key={item.id}
          className='shadow-home-page rounded-xl flex flex-col items-center justify-center gap-4 tablet:w-64 tablet:h-64 minMobil:w-72 minMobil:h-72 no-underline'
        >
          <img className='w-50' src={item.icon} alt="" />
          <h3 className='w-44 text-center'>{t(item.title)}</h3>
        </Link>)
      }
    </div>
  )
}

export default Home