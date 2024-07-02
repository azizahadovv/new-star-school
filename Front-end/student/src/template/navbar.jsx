import * as React from 'react';
import { openBar, userIcon } from '../icons';
import { Link } from 'react-router-dom';
import { SIDEBAR } from '.';
import { LANGUAGEPOTION } from '../ui';

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-light fixed-top shadowColor h-[90px] ">
      <div className="container-fluid container">
        <div className='flex items-center justify-center gap-3'>
          <button className='w-10 h-10 flex items-center justify-center bg-lightGray rounded-lg border-2 border-brGray' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
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
        <div className="offcanvas offcanvas-start text-bg-secondary" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <SIDEBAR />
        </div>
      </div>
    </nav>
  )
}

export default Navbar