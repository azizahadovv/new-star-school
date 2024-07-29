import React from 'react'
import { SEARCH } from '../icons'

function Search({ placeholder, value, setValue }) {
    return (
        <form className='tablet:min-w-96 minMobil:min-w-72 h-10 border border-brGray rounded-xl bg-lightGray flex items-center justify-between gap-2 py-1 px-2'>
            <button type='button' className='w-7 h-full flex items-center justify-center'><img src={SEARCH} alt="" /></button>
            <input value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} className='w-full no-underline outline-none px-2 py-1 flex items-center justify-start bg-lightGray' type="text" />
        </form>
    )
}

export default Search