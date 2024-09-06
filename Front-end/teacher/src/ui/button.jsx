import React from 'react'

function Button({ name, active = false, buttonFunction }) {
    return (
        <button onClick={buttonFunction} className={`py-[10px] w-full px-3 ${active ? "bg-blue text-white" : "bg-lightGray text-textBlack"} border border-brGray rounded-xl mt-2`}>
            {name}
        </button>
    )
}

export default Button