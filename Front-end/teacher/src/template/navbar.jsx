import { useDispatch, useSelector } from 'react-redux'
import { SIDEBAR } from '.'
import './navbar.css'
import { openVisible } from '../slice/sidebar'
import { openBar, userIcon } from '../icons'
import { LANGUAGEPOTION } from '../ui'
import { useEffect, useState } from 'react'
import { HomeText } from '../utils/UiFunctios'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import user_register from '../service/user'

function Navbar() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const toggle = useSelector(sel => sel.sidebarReduser.open)
  const myText = HomeText().props.children
  const user_id = sessionStorage.getItem('my-users-ids')

  useEffect(() => {
    getUsersData()
  }, [user_id])

  const getUsersData = async () => {
    const userData = await user_register.getUserData(user_id)
    setFirstName(userData.lastName);
    setName(userData.firstName);
    setImage(userData.imageUrl);
  }

  return (
    <div className='w-full shadowBG bg-white border-b border-brGray '>
      <div className='flex tablet:mx-[50px] tabletIst:mx-[100px] minMobil:mx-2 relative'>
        <div className='w-full h-20 flex items-center justify-between'>
          <div className={`flex items-center justify-center gap-3`}>
            <button onClick={() => (dispatch(openVisible()))} className='w-9 h-9 rounded-lg bg-lightGray border border-brGray flex items-center justify-center minMobil:flex tablet:hidden'>
              <img className='w-4 h-4' src={openBar} alt="" />
            </button>
            <h1 className={`minMobil:hidden tablet:block font-bold text-2xl m-0 mt-1 leading-0 flex items-center justify-center text-textBlack ${toggle ? "hidden" : "block"}`}>{myText}</h1>
          </div>
          <div className='flex items-center justify-center gap-3'>
            <div className='tablet:block minMobil:hidden'>
              <LANGUAGEPOTION />
            </div>
            <div className='flex items-center justify-center gap-2'>
              <div className='w-12 h-12 rounded-full'>
                <img className='rounded-full w-12 h-12' src={image ? image : userIcon} alt="userIcon" />
              </div>
              <div onDoubleClick={() => navigate('/profile')} className='flex items-start justify-center flex-col cursor-pointer'>
                <span className='leading-7 text-lg font-bold'>
                  <span className='minMobil:hidden tablet:block '>{firstName}.{name}</span>
                  <span className='minMobil:block tablet:hidden '>{firstName}.{name.slice(0, 1)}</span>
                </span>
                <span className='text-sm font-semibold text-textGray'>{t("table_teacher")}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`mobil:w-full minMobil:w-full h-screen fixed left-0 ${toggle ? "scale-up-hor-left block" : "hidden scale-down-hor-left"} `}>
          <SIDEBAR />
        </div>
      </div>
    </div>
  )
}

export default Navbar