import React, { useEffect } from 'react'
import { Container } from '../constanta/style'
import { homeCard } from '../constanta/const'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import student_register from '../service/register'

function Home() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const jwtToken = localStorage.getItem('jwtToken')
  const refreshToken = localStorage.getItem('refreshToken')

  useEffect(() => {
    // const validateToken = async () => {
    //   const isTokenValid = await student_register.ValidateToken(jwtToken)
    //   console.log(isTokenValid);
    //   if (window.location.pathname === '/') {
    //     if (!jwtToken || !refreshToken || !isTokenValid) {
    //       localStorage.removeItem('jwtToken')
    //       localStorage.removeItem('refreshToken')
    //       navigate('/login')
    //     } else {
          // Sahifa 1 marta yangilanadi
    // if (!sessionStorage.getItem('refreshed')) {
    //   sessionStorage.setItem('refreshed', 'true');
    //   window.location.reload();
    // }
    //     }
    //   }
    // }
    // validateToken()
  }, [jwtToken, refreshToken, navigate])

  return (
    <div className={`p-6 min-h-[360px] rounded-lg ${Container} flex flex-wrap gap-4 tablet:items-start tablet:justify-start minMobil:items-center minMobil:justify-center`}>
      {
        homeCard.map(item => <Link
          title={t(item.title)}
          to={item.link}
          key={item.id}
          className='shadow-home-page rounded-xl flex flex-col items-center justify-center gap-3 tablet:w-64 tablet:h-64 minMobil:w-72 minMobil:h-72 no-underline'
        >
          <img className='w-50' src={item.img} alt="image" />
          <h3 className='w-44 text-center'>{t(item.title)}</h3>
        </Link>)
      }
    </div>
  )
}

export default Home
