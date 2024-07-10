import React from 'react'
import { EXIT } from '../icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { exitSidebarBtn } from '../slice/register'

function ButtonExit() {
    const navitagate = useNavigate()
    const dispatch = useDispatch()

    return (
        <button
            onClick={() => {
                navitagate('/register')
                dispatch(exitSidebarBtn())
            }}
            className='flex gap-2 items-center justify-center w-full bg-white border py-[10px] rounded-2xl'>
            <img src={EXIT} alt="" />
            <span className='text-red'>Tizimdan chiqish</span>
        </button>
    )
}

export default ButtonExit