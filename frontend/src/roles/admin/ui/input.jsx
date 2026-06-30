import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'


function Input({ titleInp, typeINP, placeholder, width, value, setValue, error, helperText }) {
    const { t } = useTranslation()
    return (
        <div className="mb-3 cursor-pointer">
            <TextField required={true} value={value} onChange={(e) => setValue(e.target.value)} type={typeINP} placeholder={t(placeholder)} label={t(titleInp)} error={Boolean(error)} helperText={helperText || ""} sx={{ width: width }} />
        </div>
    )
}

export default Input