import { useDispatch, useSelector } from 'react-redux'
import { SIDEBAR } from '.'
import './navbar.css'
import { openVisible } from '../slice/sidebar'
import { openBar, userIcon } from '../icons'
import { LANGUAGEPOTION } from '../ui'
import { useEffect, useState } from 'react'
import { HomeText } from '../utils/UiFunctios'
import { useTranslation } from 'react-i18next'
import studentCotrol from '../service/student'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const { t } = useTranslation()
  const [firstName, setFirstName] = useState("")
  const [name, setName] = useState("")
  const [Image, setImage] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toggle = useSelector(sel => sel.sidebarReduser.open)
  const myText = HomeText().props.children

  const user_id = sessionStorage.getItem('my-users-ids');

  useEffect(() => {
    if (user_id) {
      const fetchData = async () => {
        try {
          const data = await studentCotrol.getStudentInId(user_id);
          if (data) {
            setFirstName(data.firstName || "");
            setName(data.lastName || "");
            setImage(data.imageUrl || "");
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };
      fetchData();
    }
  }, [user_id]);


  return (
    <div className='w-full shadowBG bg-white border-b border-brGray'>
      <div className='flex tablet:mx-[50px] tabletIst:mx-[100px] minMobil:mx-2 relative'>
        <div className='w-full h-20 flex items-center justify-between'>
          <div className={`flex items-center justify-center gap-3`}>
            <button onClick={() => (dispatch(openVisible()))} className='w-9 h-9 rounded-lg bg-lightGray border border-brGray flex items-center justify-center minMobil:flex tablet:hidden'>
              <img className='w-4 h-4' src={openBar} alt="openBar" />
            </button>
            <h1 className={`minMobil:hidden tablet:block font-bold text-2xl m-0 mt-1 leading-0 flex items-center justify-center text-textBlack ${toggle ? "hidden" : "block"}`}>{myText}</h1>
          </div>
          <div className='flex items-center justify-center gap-3'>
            <div className='tablet:block minMobil:hidden'>
              <LANGUAGEPOTION />
            </div>
            <div className='flex items-center justify-center gap-2' onDoubleClick={() => navigate('/profile')}>
              <div className='w-12 h-12 rounded-full'>
                <img className='rounded-full w-11 h-11' src={Image !== '' ? Image : userIcon} alt="userIcon" />
              </div>
              <div className='flex items-start justify-center flex-col'>
                <span className='leading-7 text-lg font-bold'>
                  <span className='minMobil:hidden tablet:block '>{firstName}.{name}</span>
                  <span className='minMobil:block tablet:hidden '>{firstName}.{name.slice(0, 1)}</span>
                </span>
                <span className='text-sm font-semibold text-textGray'>{t("student_home")}</span>
              </div>
            </div>
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