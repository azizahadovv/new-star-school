import React from 'react'
import { NAVBAR } from '.'
import { Outlet, useNavigate } from 'react-router-dom'
import { ContainerW } from '../constanta/style'
import { GIFFILE } from '../icons'
import { useSelector } from 'react-redux'

function Layout() {
    const open = useSelector((sel) => sel.sidebarReduser.open);

    const path = window.location.pathname
    const navigate = useNavigate()
    return (
        <>
            <NAVBAR />
            <div className={`${ContainerW} ${open?"hidden":"block"}`}>
                {
                    path === '/' ? null :
                        <button onClick={() => navigate(-1)} className='text-3xl rotate-180 p-2'><img width={40} src={GIFFILE} alt="" /></button>
                }
            </div>
            <Outlet />
        </>
    )
}

export default Layout