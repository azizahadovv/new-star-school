import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { GRADESTUDENTS, Home, ListOfClasses, ListOfClassesID, PROFIL, PageNoteFound, REGISTER, TIMETABLE } from '../components'
import { LAYOUT } from '../template';

function ReactRouter() {
    const token = localStorage.getItem('token');
    return (
        <div >
            <Routes>
                <Route path='/' element={<LAYOUT />} >
                    <Route path='' element={<Home />} />
                    <Route path='list-of-classes' element={<ListOfClasses />} />
                    <Route path='list-of-classes/grade/:id' element={<ListOfClassesID />} />
                    <Route path='list-of-classes/view-ratings/:id' element={<GRADESTUDENTS />} />
                    <Route path='profile' element={<PROFIL />} />
                    <Route path='time-table' element={<TIMETABLE />} />
                </Route>
                <Route path='*' element={<PageNoteFound />} />
                <Route path='/login' element={<REGISTER />} />
            </Routes>
        </div >

    )
}

export default ReactRouter