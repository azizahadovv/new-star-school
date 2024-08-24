import { useDispatch } from 'react-redux';
import { BUTTONEXIT, BUTTONSIDEBAR, LANGUAGEPOTION } from '../ui';
import { Link } from 'react-router-dom';
import { logo } from '../icons';
import { openVisible } from '../slice/sidebar';
import { homeCard2 } from '../constanta/const';
import { useTranslation } from 'react-i18next';
function Sidebar() {
  const dispatch = useDispatch()
  const { t } = useTranslation();
  return (
    <div className='p-3 d-flex flex-col gap-3 w-full h-screen bg-darkGray relative z-50'>
      <div className="offcanvas-header border-b border-white d-flex align-items-center justify-content-between py-3">
        <Link to={"/"} onClick={() => dispatch(openVisible())} className="offcanvas-title" id="offcanvasDarkNavbarLabel"><img className='w-36' src={logo} alt="logo" /></Link>
        <button onClick={() => dispatch(openVisible())} className="btn-close btn-close-white"></button>
      </div>
      <div className="flex justify-center flex-col items-stretch">
        <div className="flex flex-col justify-center items-stretch gap-3">
          {
            homeCard2.map(item => <BUTTONSIDEBAR key={item.id} barVisible={() => dispatch(openVisible())} slug={item.link} img={item.img1} img2={item.img2} name={t(item.title)} />)
          }
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