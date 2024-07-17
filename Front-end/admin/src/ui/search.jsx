import React from 'react'
import { searchImg } from '../icons'

function Search({ placeholder = 'O‘quvchi bo‘ylab izlash' }) {
    return (
        <label className='w-full min-h-10 rounded-lg bg-lightGray border border-brGray px-2 flex items-stretch justify-between gap-2'>
            <input type="text" placeholder={placeholder} className='w-full bg-lightGray px-2 no-underline border-none outline-none' />
            <button>
                <img src={searchImg} alt="searchImg" />
            </button>
        </label>
    )
}

export default Search