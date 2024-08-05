import React from 'react'
import { NAVBAR } from '.'
import { Outlet, useNavigate } from 'react-router-dom'
import { GIFFILE } from '../icons'
import { useSelector } from 'react-redux'

function Layout() {
    const path = window.location.pathname
    const open = useSelector((sel) => sel.sidebarReduser.open);
    const navigate = useNavigate()
    return (
        <>
            <NAVBAR />
            <div className={`w-full tablet:px-10 minMobil:px-1 minMobil:py-1 ${open ? "hidden" : "block"}`}>
                {
                    path === '/' ? null :
                        <button onClick={() => navigate(-1)} className='text-3xl rotate-180 p-2'><img width={40} src={GIFFILE} alt="GIFFILE" /></button>
                }
            </div>
            <Outlet />
        </>
    )
}

export default Layout