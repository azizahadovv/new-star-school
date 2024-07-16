import React from 'react'
import { Container, activeEdit, styleTopBarUINoFlex } from '../constanta/style'
import { BUTTON, SEARCH, SELECTSCINES } from '../ui'
import { Link, useNavigate } from 'react-router-dom'
import { arrowRight, editBlue, menuDots, trash } from '../icons'
import { useDispatch, useSelector } from 'react-redux'
import { showActiveModal } from '../slice/addclass'

function Teacher() {
  const navigate = useNavigate()
  const visible = useSelector(sel => sel.addclass.activeModal)
  const dispatch = useDispatch()
  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUINoFlex} min-h-20 flex items-center justify-between tablet:px-3 minMobil:px-1 overflow-scroll`}>
        <div className='tablet:w-1/2 minMobil:min-w-[350px] flex gap-3 mr-[150px]'>
          <div className='tablet:w-2/3 minMobil:min-w-80'><SEARCH placeholder='O‘qituvchi bo‘ylab izlash' /></div>
          <div className='tablet:w-3/12 minMobil:min-w-36'><SELECTSCINES /></div>
        </div>
        <div className='min-w-28'>
          <BUTTON buttonFunction={() => navigate('/add-user')} active name={'O‘qituvchi qo‘shish'} />
        </div>
      </div>
      <div className={`${styleTopBarUINoFlex} min-h-96 overflow-scroll p-3`}>
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
                <p className='w-[270px]'>To‘lqin Ziyodullayev</p>
              </td>
              <td>
                <p className='w-[150px]'>Ingliz tili, Rus tili</p>
              </td>
              <td>
                <p className='w-[110px]'>1990-01-01</p>
              </td>
              <td>
                <p className='min-w-max'>+998999999999</p>
              </td>
              <td>
                <div className='w-[150px] flex items-center justify-between relative'>
                  <Link to={''} className='flex items-center justify-center gap-2 no-underline'>Batafsil <img src={arrowRight} alt="" /></Link>
                  <button onClick={() => dispatch(showActiveModal())}><img src={menuDots} width={25} className=' p-1' alt="menuDots" /></button>
                  <div className={`${activeEdit} ${visible ? 'block' : 'hidden'} absolute top-0 -right-36`}>
                    <button className='flex items-stretch justify-center gap-2 border-b border-brGray'><img src={editBlue} width={18} alt="editBlue" />Tahrirlash</button>
                    <button className='flex items-stretch justify-center gap-2'><img src={trash} width={20} alt="trash" />O‘chirish</button>
                  </div>
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