import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ATTENDANCE, CLASSSCHEDULE, GRADERATING, Home, PROFIL, PageNoteFound, REGISTER } from '../components'
import { LAYOUT, NAVBAR } from '../template';

function ReactRouter() {
    const token = localStorage.getItem('token');
    return (
        <div >
            <Routes>
                <Route path='/' element={<LAYOUT />} >
                    <Route path='' element={<Home />} />
                    <Route path='class-schedule' element={<CLASSSCHEDULE />} />
                    <Route path='grade-rating' element={<GRADERATING />} />
                    <Route path='atendance' element={<ATTENDANCE />} />
                    <Route path='profile' element={<PROFIL />} />
                </Route>
                <Route path='*' element={<PageNoteFound />} />
                <Route path='/register' element={<REGISTER />} />
            </Routes>

            {/* </Routes> */}

        </div >

    )
}

export default ReactRouter