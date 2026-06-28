import React from 'react'
import { EXIT } from '../icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { exitSidebarBtn } from '../slice/register'
import { useTranslation } from 'react-i18next'

function ButtonExit() {
    const { t } = useTranslation()
    const navitagate = useNavigate()
    const dispatch = useDispatch()
    return (
        <button
            onClick={() => {
                navitagate('/login')
                localStorage.removeItem('jwtToken')
            }}
            className='flex gap-2 items-center justify-center w-full bg-white border py-[10px] rounded-lg'>
            <img src={EXIT} alt="" />
            <span className='text-red'>{t("exit")}</span>
        </button>
    )
}

export default ButtonExit