import { TextField } from '@mui/material'
import React from 'react'

function Input({ value, setValue, titleInp, typeINP, placeholder, width }) {
    return (
        <div className="mb-3 cursor-pointer">
            <TextField value={value} onChange={(e) => setValue(e.target.value)} type={typeINP} placeholder={placeholder} label={titleInp} sx={{ width: width }} />
        </div>
    )
}

export default Input