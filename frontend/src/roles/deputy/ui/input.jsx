import { TextField } from '@mui/material'
import React from 'react'

function Input({ titleInp, typeINP, placeholder, width, value, setValue }) {
    return (
        <div className="mb-3 cursor-pointer">
            <TextField required={true} value={value} onChange={(e) => setValue(e.target.value)} type={typeINP} placeholder={placeholder} label={titleInp} sx={{ width: width }} />
        </div>
    )
}

export default Input