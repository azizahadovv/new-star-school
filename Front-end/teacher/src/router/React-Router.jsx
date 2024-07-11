import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, ListOfClasses, ListOfClassesID, PROFIL, PageNoteFound, REGISTER } from '../components'
import { LAYOUT } from '../template';

function ReactRouter() {
    const token = localStorage.getItem('token');
    return (
        <div >
            <Routes>
                <Route path='/' element={<LAYOUT />} >
                    <Route path='' element={<Home />} />
                    <Route path='list-of-classes' element={<ListOfClasses />} />
                    <Route path='list-of-classes/:id' element={<ListOfClassesID  />} />
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