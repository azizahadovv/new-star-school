import React from 'react'

function Button({ name }) {
    return (
        <div className='w-full bg-red-400w-full cursor-pointer bg-darkGray p-3 rounded-lg  text-center capitalize text-white outline-none no-underline'>{name}</div>
    )
}

export default Button