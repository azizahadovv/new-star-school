import React from 'react'

function Button({ name, active = false, buttonFunction, img = '' }) {
    return (
        <button onClick={buttonFunction} className={`py-[10px] px-3 w-full ${active ? "bg-blue text-white" : "bg-lightGray text-textBlack"} border border-brGray rounded-xl mt-2 flex items-center justify-center gap-2`}>
            <img src={img} alt="" />   {name}
        </button>
    )
}

export default Button