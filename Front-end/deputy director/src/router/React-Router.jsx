import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CLASSSCHEDULES, CLASSSCHEDULESID, Home, ListOfClasses, ListOfClassesID, MYCLASSES, MYCLASSESID, PROFIL, PageNoteFound, REGISTER, TEACHER } from '../components'
import { LAYOUT } from '../template';

function ReactRouter() {
    const token = localStorage.getItem('token');
    return (
        <div >
            <Routes>
                <Route path='/' element={<LAYOUT />} >
                    <Route path='' element={<Home />} />
                    <Route path='my-classes' element={< MYCLASSES />} />
                    <Route path='my-classes/:id' element={<MYCLASSESID />} />
                    <Route path='list-of-classes' element={<ListOfClasses />} />
                    <Route path='list-of-classes/:id' element={<ListOfClassesID />} />
                    <Route path='class-schedule' element={<CLASSSCHEDULES />} />
                    <Route path='class-schedule/:id' element={<CLASSSCHEDULESID />} />
                    <Route path='teachers' element={<TEACHER />} />
                    <Route path='students' element={<CLASSSCHEDULESID />} />
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