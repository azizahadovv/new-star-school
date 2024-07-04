import * as React from 'react';
import { openBar, userIcon } from '../icons';
import { Link } from 'react-router-dom';
import { ANTD, SIDEBAR } from '.';
import { LANGUAGEPOTION } from '../ui';
import './navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { openVisible } from '../slice/sidebar';
function Navbar() {
  const visible = useSelector(select => select.sidebarReduser.open)
  const dispatch = useDispatch()

  return (
    <nav className="navbar navbar-dark bg-light fixed-top shadowColor h-[90px]">
      {/* <div className="container-fluid container">
        <div className='flex items-center justify-center gap-3'>
          <button onClick={() => dispatch(openVisible())} className='w-10 h-10 flex items-center justify-center bg-lightGray rounded-lg border-2 border-brGray' >
            <span className=""> <img src={openBar} alt="" /></span>
          </button>
          <span className='font-bold text-2xl minMobil:hidden tablet:block'>Dars jadvali</span>
        </div>
        <div className='flex items-center justify-center gap-3'>
          <div className='w-[100px] minMobil:hidden tablet:block'>
            <LANGUAGEPOTION />
          </div>
          <Link to={'/profile'} className='flex gap-3 items-center justify-center h-full no-underline '>
            <button className='w-10 h-10 rounded-full overflow-hidden bg-red-700'><img src={userIcon} alt="#" /></button>
            <div className='fontProDisplay flex items-start justify-center flex-col'>
              <span className={`text-center leading-7 font-semibold tablet:block text-textBlack capitalize text-2xl`}>Ziyodullayev.T</span>
              <span className='font-semibold leading-4 text-textGray'>O‘quvchi</span>
            </div>
          </Link>
        </div>
        <div className={`bg-darkGray laptop:w-1/4 tablet:w-1/3 mobil:w-1/2 minMobil:w-full ${visible ? "block scale-up-hor-left my-sidebar" : "hidden"}`}>
          <SIDEBAR />
        </div>
      </div> */}
      <ANTD />
    </nav>
  )
}

export default Navbar