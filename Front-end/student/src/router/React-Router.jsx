import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, PROFIL, PageNoteFound, REGISTER } from '../components'
import { LAYOUT } from '../template';

function ReactRouter() {
    const token = localStorage.getItem('token');
    return (
        <div className='container'>
            <Routes>
                <Route path='/' element={<LAYOUT />} >
                    <Route path='' element={<Home />} />
                    <Route path='profile' element={<PROFIL />} />
                </Route>

                <Route path='*' element={<PageNoteFound />} />
                <Route path='/register' element={<REGISTER />} />
            </Routes>


            {/* </Routes> */}

        </div>

    )
}

export default ReactRouter