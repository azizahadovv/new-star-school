import React from 'react'
import { NOTFOUND } from '../icons'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function NoteFound() {
  const {t}=useTranslation()
    const navigate = useNavigate()
    return (
        <div className='flex items-center justify-center flex-col gap-3 '>
            <img className='w-50' src={NOTFOUND} alt="Page Not Found" />
            <h1 className='fontPoppins'>Sahifa topilmadi :(</h1>
            <button onClick={() => (navigate(-1))} className='py-2 px-3 bg-red-500 text-white text-2xl flex items-center justify-center gap-1 rounded-2xl'><ArrowBackIcon /> {t("back_out")}</button>
        </div>
    )
}

export default NoteFound