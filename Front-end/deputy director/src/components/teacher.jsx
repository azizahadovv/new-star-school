import React from 'react'
import { Container, styleTopBarUINoFlex } from '../constanta/style'
import { BUTTON, SEARCH, SELECTSCINES } from '../ui'
import { Link, useNavigate } from 'react-router-dom'
import { ARRIGHT } from '.'

function Teacher() {
  const navigate = useNavigate()
  return (
    <div className={`${Container} bg-orange-400 `}>
      <div className={`${styleTopBarUINoFlex} min-h-20 flex items-center justify-between tablet:px-3 minMobil:px-1 overflow-scroll`}>
        <div className='tablet:w-1/2 minMobil:min-w-[350px] flex gap-3 mr-[150px]'>
          <div className='tablet:w-2/3 minMobil:min-w-80'><SEARCH placeholder='O‘qituvchi bo‘ylab izlash' /></div>
          <div className='tablet:w-3/12 minMobil:min-w-36'><SELECTSCINES /></div>
        </div>
        <div className='min-w-28'>
          <BUTTON buttonFunction={() => navigate('/add-teacher')} active name={'O‘qituvchi qo‘shish'} />
        </div>
      </div>
      <div className={`${styleTopBarUINoFlex} min-h-96 overflow-scroll`}>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>№</th>
              <th>O‘qituvchi</th>
              <th>Fan</th>
              <th>Tug’ilgan sanasi</th>
              <th>Telefon raqam</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>
                <p className='w-[270px] bg-red'>To‘lqin Ziyodullayev</p>
              </td>
              <td>
                <p className='w-[150px] bg-red'>Ingliz tili, Rus tili</p>
              </td>
              <td>
                <p className='w-[110px] bg-red'>1990-01-01</p>
              </td>
              <td>
                <p className='min-w-max bg-red'>+998999999999</p>
              </td>
              <td>
                <div className='w-[200px] bg-orange-500'>
                  <Link to={''}>Batafsil <img src={"ARRIGHT"} alt="" /></Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default Teacher