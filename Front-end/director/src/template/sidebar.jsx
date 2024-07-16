import { useDispatch } from 'react-redux';
import { BUTTONEXIT, BUTTONSIDEBAR, LANGUAGEPOTION } from '../ui';
import { Link, useNavigate } from 'react-router-dom';
import { infoUser, infoUserOutline, LISTCLASS, LISTCLASSOUTLINE, logo, savatcha, savatchaOutline } from '../icons';
import { openVisible } from '../slice/sidebar';
function Sidebar() {
  const dispatch = useDispatch()
  const navitagate = useNavigate()
  return (
    <div className='p-3 d-flex flex-col gap-3 w-full h-screen bg-darkGray'>
      <div className="offcanvas-header border-b border-white d-flex align-items-center justify-content-between py-3">
        <Link to={"/"} onClick={() => dispatch(openVisible())} className="offcanvas-title" id="offcanvasDarkNavbarLabel"><img className='w-36' src={logo} alt="logo" /></Link>
        <button onClick={() => dispatch(openVisible())} className="btn-close btn-close-white"></button>
      </div>
      <div className="flex justify-center flex-col items-stretch">
        <div className="flex flex-col justify-center items-stretch gap-2">
          <BUTTONSIDEBAR barVisible={() => dispatch(openVisible())} slug={'/list-of-classes'} img={LISTCLASS} img2={LISTCLASSOUTLINE} name={"Sinflar ro'yhati"} />
          <BUTTONSIDEBAR barVisible={() => dispatch(openVisible())} slug={'/profile'} img={infoUser} img2={infoUserOutline} name={"Shaxsiy malumotlar"} />
        </div>
        <div className='w-full minMobil:block tablet:hidden mt-5'>
          <LANGUAGEPOTION />
        </div>
        <div className='mt-4'>
        <BUTTONEXIT />
        </div>
      </div>
    </div>
  )
}

export default Sidebar