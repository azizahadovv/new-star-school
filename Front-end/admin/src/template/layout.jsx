import React from 'react'
import { NAVBAR, SIDEBAR } from '.'
import { Outlet } from 'react-router-dom'
import { ContainerNoWidth } from '../constanta/style'
import { Breadcrumbs } from '../components'

function Layout() {
    return (
        <>
            <NAVBAR />
            <div className={`${ContainerNoWidth}`}>
                <Breadcrumbs />
            </div>
            <Outlet />
        </>
    )
}

export default Layout