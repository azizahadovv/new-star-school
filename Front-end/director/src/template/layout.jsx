import React from 'react'
import { NAVBAR } from '.'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Layout() {
    return (
        <>
            <NAVBAR />
            <Outlet />
        </>
    )
}

export default Layout