import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, PROFIL, PageNoteFound, REGISTER } from '../components'
import { LAYOUT } from '../template';

function ReactRouter() {
    const token = localStorage.getItem('token');
    return (
        <div >
            <Routes>
                <Route path='/' element={<LAYOUT />} >
                    <Route path='' element={<Home />} />
                    <Route path='profile' element={<PROFIL />} />
                </Route>
<<<<<<< HEAD
=======

>>>>>>> 8c6a15fb91b24e2bbb3a12d19f05dae130261b47
                <Route path='*' element={<PageNoteFound />} />
                <Route path='/register' element={<REGISTER />} />
            </Routes>


            {/* </Routes> */}

        </div>

    )
}

export default ReactRouter