import React from 'react'
import { NAVBAR } from '.'
import { Outlet } from 'react-router-dom'

function layout() {
    return (
        <>
            <NAVBAR />
            <Outlet />
        </>
    )
}

export default layout