import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, PageNoteFound, REGISTER } from '../components'

function ReactRouter() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<REGISTER />} />
            <Route path='*' element={<PageNoteFound />} />
        </Routes>
    )
}

export default ReactRouter