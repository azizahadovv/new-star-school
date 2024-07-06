import { useDispatch, useSelector } from 'react-redux'
import { SIDEBAR } from '.'
import './navbar.css'
import { openVisible } from '../slice/sidebar'
import { openBar } from '../icons'
import { LANGUAGEPOTION } from '../ui'
import { MdTableRows } from "react-icons/md";
import { NavLink } from 'react-router-dom'

function Navbar() {
  const dispatch = useDispatch()
  const toggle = useSelector(sel => sel.sidebarReduser.open)
  return (
    <div className='w-full shadowBG bg-white border-b border-brGray '>
      <div className='flex container relative'>
        <div className='w-full h-20 flex items-center justify-between'>
          <div className={`flex items-center justify-center gap-3`}>
            <button onClick={() => (dispatch(openVisible()))} l className='w-10 h-10 rounded-lg bg-lightGray border border-brGray flex items-center justify-center'>
              <img className='w-5 h-5' src={openBar} alt="" />
            </button>
            <h2 className={`minMobil:hidden tablet:block font-semibold text-textBlack ${toggle ? "hidden" : "block"}`}>Dars jadvali</h2>
          </div>
          <div>
            <LANGUAGEPOTION />
          </div>
        </div>
        <div className={`tablet:w-1/4 mobil:w-1/2 minMobil:w-full h-screen fixed left-0 ${toggle ? "scale-up-hor-left block" : "hidden scale-down-hor-left"} `}>
          <SIDEBAR />
        </div>

      </div>
    </div>
  )
}

export default Navbar