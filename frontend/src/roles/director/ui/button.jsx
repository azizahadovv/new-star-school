import React from 'react'

function Button({ name, active = false, buttonFunction,width="" }) {
    return (
        <button onClick={buttonFunction} className={`py-[10px] px-3 ${width} w-full ${active ? "bg-blue text-white" : "bg-lightGray text-textBlack"} border border-brGray rounded-xl mt-2 flex items-center justify-center gap-2`}>
      {name}
        </button>
    )
}

export default Button