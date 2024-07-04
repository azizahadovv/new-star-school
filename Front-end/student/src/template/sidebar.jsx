import { useDispatch } from 'react-redux';
import { exitSidebarBtn } from '../slice/register';
import { BUTTONSIDEBAR, LANGUAGEPOTION } from '../ui';
import { useNavigate } from 'react-router-dom';
import { attendance, infoUser, logo, rating, savatcha } from '../icons';
<<<<<<< HEAD
import { openVisible } from '../slice/sidebar';
=======
>>>>>>> 8c6a15fb91b24e2bbb3a12d19f05dae130261b47

function Sidebar({ open }) {
  const dispatch = useDispatch()
  const navitagate = useNavigate()
<<<<<<< HEAD

  return (
    <div className='p-3 d-flex flex-col gap-3'>
      <div className="offcanvas-header border-b border-white d-flex align-items-center justify-content-between py-3">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel"><img className='w-36' src={logo} alt="logo" /></h5>
        <button onClick={()=>dispatch(openVisible())} className="btn-close btn-close-white"></button>
=======
  return (
    <div className='p-3'>
      <div className="offcanvas-header border-b border-white ">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel"><img className='w-36' src={logo} alt="logo" /></h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
>>>>>>> 8c6a15fb91b24e2bbb3a12d19f05dae130261b47
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <BUTTONSIDEBAR img={savatcha} boolean={true} name={"Dars jadvali"} obj={{ drop1: "Action", drop2: "Another action", drop3: "Something else here" }} />
          <BUTTONSIDEBAR img={rating} name={"Baxolar reytingi"} obj={{ drop1: "Action", drop2: "Another action", drop3: "Something else here" }} />
          <BUTTONSIDEBAR img={attendance} name={"Davomat"} obj={{ drop1: "Action", drop2: "Another action", drop3: "Something else here" }} />
          <BUTTONSIDEBAR img={infoUser} name={"Shaxsiy malumotlar"} obj={{ drop1: "Action", drop2: "Another action", drop3: "Something else here" }} />
        </ul>
        <div className='w-full minMobil:block tablet:hidden mt-5'>
          <LANGUAGEPOTION />
        </div>
        <button onClick={() => {
          navitagate('/register')
          dispatch(exitSidebarBtn())
        }} className="btn btn-danger w-100 mt-2 py-2 d-flex justify-content-between align-items-center" href="#" role="button">
          Exit
        </button>
      </div>
    </div>
  )
}

export default Sidebar