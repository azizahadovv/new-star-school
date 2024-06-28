import * as React from 'react';
import { userIcon } from '../icons';
import { Link } from 'react-router-dom';
import { SIDEBAR } from '.';

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid container">
        <button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div>
          <Link to={'/profile'} className='flex gap-3 items-center justify-center h-full no-underline'>
            <button className='w-10 h-10 rounded-full overflow-hidden bg-red-700'><img src={userIcon} alt="#" /></button>
            <span className={`h-10 text-center leading-10 tablet:block text-white`}>Salimov.S</span>
          </Link>
        </div>
        <div className="offcanvas offcanvas-start text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <SIDEBAR />
        </div>
      </div>
    </nav>
  )
}

export default Navbar