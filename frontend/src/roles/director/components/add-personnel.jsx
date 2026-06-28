import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, INPUT_CLASSES, styleTopBarUI } from '../constanta/style'
import { BUTTON, SELECTJOB } from '../ui'
import { useTranslation } from 'react-i18next'
import personnel_controllers from '../service/personnel'
import { toast } from 'react-toastify'

function AddPersonnel() {
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [phoneNumber, setphoneNumber] = useState('')
    const [jobName, setJobName] = useState('')
    const navigate = useNavigate()
    const { t } = useTranslation()
    const datas = {
        firstName: firstName,
        lastName: lastName,
        middleName: patronymic,
        birthDate: birthDate,
        profession: "ACCOUNTANT",
        phoneNumber: String(phoneNumber),
    }
    const saveFunctions = async () => {
        if (lastName != '' && firstName != '' && patronymic != '' && birthDate != '' && phoneNumber != '' && jobName != '') {
            try {
                await personnel_controllers.postdata(datas)
                navigate(-1)
            } catch (error) {
                toast.error(error);
            }
        } else {
            toast.error(t("fill_all_fields"));
        }
    }
    return (
        <div className={`${Container}`}>
            <div className={`${styleTopBarUI} p-3 min-h-96`}>
                <div className='flex flex-wrap items-center tablet:justify-start gap-5 minMobil:justify-center'>
                    <TextField
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        type="text"
                        label={t("firstName")}
                        sx={INPUT_CLASSES}
                    />
                    <TextField
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        type="text"
                        label={t("lastName")}
                        sx={INPUT_CLASSES}
                    />
                    <TextField
                        value={patronymic}
                        onChange={(e) => setPatronymic(e.target.value)}
                        required
                        type="text"
                        label={t("patronymic")}
                        sx={INPUT_CLASSES}
                    />
                    <TextField
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                        type="date"
                        label={t("birthday")}
                        sx={INPUT_CLASSES}
                    />
                    <div className='tablet:w-[370px] minMobil:w-full'>
                        <SELECTJOB value={jobName} setValue={setJobName} />
                    </div>
                    <TextField
                        value={phoneNumber.length > 13 ? null : phoneNumber}
                        onChange={(e) => setphoneNumber(e.target.value)}
                        required
                        error={phoneNumber.length > 13}
                        type="tel"
                        label={t("phone_number")}
                        sx={INPUT_CLASSES}
                    />
                </div>
                <div className='tablet:w-56 minMobil:-full'>
                    <BUTTON buttonFunction={saveFunctions} name={t("save")} active />
                </div>
            </div>
        </div>
    )
}

export default AddPersonnel
