import { TextField } from '@mui/material'
import React from 'react'

function Input({ titleInp, typeINP, placeholder, width }) {
    return (
        <div className="mb-3 cursor-pointer">
            <TextField type={typeINP} placeholder={placeholder} label={titleInp} sx={{ width: width }} />
        </div>
    )
}

export default Input