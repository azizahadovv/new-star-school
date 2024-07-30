import React, { useState } from 'react'
import { searchImg } from '../icons'

function Search({ searchValue, setSearcheValue, searchFunction, placeholder = 'O‘quvchi bo‘ylab izlash' }) {

    return (
        <label className='w-full min-h-10 rounded-lg bg-lightGray border border-brGray px-2 flex items-stretch justify-between gap-2'>
            <input value={searchValue} onChange={(e) => (setSearcheValue(e.target.value))} type="text" placeholder={placeholder} className='w-full bg-lightGray px-2 no-underline border-none outline-none' />
            <button onClick={searchFunction}>
                <img src={searchImg} alt="searchImg" />
            </button>
        </label>
    )
}

export default Search