import { useDispatch } from 'react-redux';
import { exitSidebarBtn } from '../slice/register';
import { BUTTONSIDEBAR, LANGUAGEPOTION } from '../ui';
import { useNavigate } from 'react-router-dom';
import { attendance, attendanceOutline, infoUser, infoUserOutline, logo, rating, ratingOutline, savatcha, savatchaOutline } from '../icons';
import { openVisible } from '../slice/sidebar';
function Sidebar({ open }) {
  const dispatch = useDispatch()
  const navitagate = useNavigate()
  return (
    <div className='p-3 d-flex flex-col gap-3 w-full h-screen bg-darkGray'>
      <div className="offcanvas-header border-b border-white d-flex align-items-center justify-content-between py-3">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel"><img className='w-36' src={logo} alt="logo" /></h5>
        <button onClick={() => dispatch(openVisible())} className="btn-close btn-close-white"></button>
      </div>
      <div className="flex justify-center flex-col items-stretch">
        <div className="flex flex-col justify-center items-stretch gap-2">
          <BUTTONSIDEBAR slug={'/'} img={savatcha} img2={savatchaOutline} name={"Dars jadvali"} />
          <BUTTONSIDEBAR slug={'/rating'} img={rating} img2={ratingOutline} name={"Baxolar reytingi"} />
          <BUTTONSIDEBAR slug={'/davomat'} img={attendance} img2={attendanceOutline} name={"Davomat"} />
          <BUTTONSIDEBAR slug={'/profile'} img={infoUser} img2={infoUserOutline} name={"Shaxsiy malumotlar"} />
        </div>
        <div className='w-full minMobil:block tablet:hidden mt-5'>
          <LANGUAGEPOTION />
        </div>
        <button onClick={() => {
          navitagate('/register')
          dispatch(exitSidebarBtn())
        }} className="btn btn-danger w-100 mt-16 py-2 d-flex justify-content-between align-items-center" href="#" role="button">
          Exit
        </button>
      </div>
    </div>
  )
}

export default Sidebar