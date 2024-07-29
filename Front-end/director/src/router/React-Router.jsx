import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, ListOfClasses, ListOfClassesID, PERSONNEL, PROFIL, PageNoteFound, RATING, REGISTER, STUDENTPROFILE, STUDENTS, TEACHERPROFILE, TEACHERS } from '../components'
import { LAYOUT } from '../template';

function ReactRouter() {
    const token = localStorage.getItem('token');
    return (
        <div >
            <Routes>
                <Route path='/' element={<LAYOUT />} >
                    <Route path='' element={<Home />} />
                    <Route path='list-of-classes' element={<ListOfClasses />} />
                    <Route path='list-of-classes/:id' element={<ListOfClassesID />} />
                    <Route path='personal-information' element={<PROFIL />} />
                    <Route path='teachers' element={<TEACHERS />} />
                    <Route path='teachers/:id' element={<TEACHERPROFILE />} />
                    <Route path='students' element={<STUDENTS />} />
                    <Route path='students/:id' element={<STUDENTPROFILE />} />
                    <Route path='personnel' element={<PERSONNEL />} />
                    <Route path='ratings' element={<RATING />} />


                </Route>
                <Route path='*' element={<PageNoteFound />} />
                <Route path='/register' element={<REGISTER />} />
            </Routes>

            {/* </Routes> */}

        </div >

    )
}

export default ReactRouter