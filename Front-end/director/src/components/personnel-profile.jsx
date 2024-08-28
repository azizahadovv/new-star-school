import React, { useEffect, useState } from 'react'
import { Container, INPUT_CLASSES, styleTopBarUINoFlex } from '../constanta/style'
import { toast, ToastContainer } from 'react-toastify'
import { EDIT, ICONIMG } from '../icons'
import personnel_controllers from '../service/personnel'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Rodal from 'rodal'
import { TextField } from '@mui/material'
import { BUTTON, SELECTJOB } from '../ui'

function ProfilePersonnel() {
    const [dataTeacher, setDataTeacher] = useState({})
    const [visible, setVisible] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [phoneNumber, setphoneNumber] = useState('')
    const [jobName, setJobName] = useState('')


    const { id } = useParams()
    const navigate = useNavigate()
    const { t } = useTranslation()
    useEffect(() => {
        get_datas_Persons()
    }, [])


    const saveImage = async (e) => {
        if (!e.name.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            toast.error("File extension should be jpg, jpeg, png, gif, svg")
            return;
        }
        const formData = new FormData();
        formData.append('file', e);
        try {
            await personnel_controllers.updateImage(id, formData)
            get_datas_Persons()
        } catch (error) {
            toast.error("Pay attention to the file extension `PNG,JPG,SVG`")
            console.log(error);
        }
    }

    const get_datas_Persons = async () => {
        try {
            const response = await personnel_controllers.getDataPersonsInID(id)
            setDataTeacher(response)
        } catch (error) {
            console.log(error);
            navigate(-1)
        }
    }

    function setterValue() {
        setVisible(true)
        setFirstName(dataTeacher.firstName)
        setLastName(dataTeacher.lastName)
        setPatronymic(dataTeacher.middleName)
        setBirthDate(dataTeacher.birthDate)
        setphoneNumber(dataTeacher.phoneNumber)
        setJobName(dataTeacher.profession)
    }


    const editUseersData = async () => {
        setterValue()
        if (lastName != '' && firstName != '' && patronymic != '' && birthDate != '' && phoneNumber != '' && jobName != '') {
            try {
                await personnel_controllers.updateUsersData(id, {
                    firstName: firstName,
                    lastName: lastName,
                    middleName: patronymic,
                    birthDate: birthDate,
                    profession: jobName,
                    phoneNumber: phoneNumber,
                }).then(() => {
                    get_datas_Persons()
                    setVisible(false)
                })
            } catch (error) {
                toast.error(error.message)
            }
        }
        else {
            toast.info(t("please_fill_all_fields"))
        }
    }
    return (
        <div className={`${Container} flex tablet:items-start minMobil:items-center tablet:justify-start minMobil:justify-center gap-3 flex-wrap`}>
            <div className={`${styleTopBarUINoFlex} w-[300px] h-[380px] p-3 rounded-3xl flex items-center justify-between flex-col`}>
                <div className='w-full h-[80%] flex items-center justify-center rounded-xl overflow-hidden cursor-pointer'>
                    {
                        dataTeacher?.imageUrl === null || dataTeacher?.imageUrl === "" ? <div className='w-40 h-40 flex items-center justify-center rounded-full overflow-hidden bg-blue uppercase'>
                            <span className='text-6xl text-white flex items-center justify-center'>{dataTeacher?.firstName.charAt(0) + "." + dataTeacher?.lastName.charAt(0)}</span>
                        </div> : <img className='rounded-full w-full h-full' src={dataTeacher?.imageUrl} alt="dataTeacher?.image" />
                    }
                </div>
                <label className={`py-[10px] px-3 w-full ${"bg-lightGray text-textBlack"} border border-brGray rounded-xl mt-2 flex items-center justify-center gap-2 cursor-pointer`}>
                    <input onChange={(e) => saveImage(e.target.files[0])} hidden type="file" />
                    <span className='flex items-center justify-center gap-2'>
                        <img src={ICONIMG} alt="" />
                        {t("edit")}
                    </span>
                </label>
            </div>
            <div className={`${styleTopBarUINoFlex} tablet:w-3/4 minMobil:w-full min-h-20 px-3 py-2`}>
                <div className='flex items-center justify-start min-h-16 border-b border-brGray mb-3'>
                    <h3 className='text-blue font-bold'>{t("personal_information")}</h3>
                </div>
                <table className="table table-striped table-hover">
                    <tbody>
                        <tr>
                            <th className='w-50'>{t("firstName")}:</th>
                            <th className='w-50'>{dataTeacher?.firstName}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t("lastName")}:</th>
                            <th className='w-50'>{dataTeacher?.lastName}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t("patronymic")}:</th>
                            <th className='w-50'>{dataTeacher?.middleName}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t("birthday")}:</th>
                            <th className='w-50'>{dataTeacher?.birthDate}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t("table_classes")}:</th>
                            <th className='w-50'>{dataTeacher?.profession}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t("phone_number")}:</th>
                            <th className='w-50'>{dataTeacher?.phoneNumber}</th>
                        </tr>
                    </tbody>
                    <button onClick={setterValue} className='bg-blue tablet:w-52 minMobil:w-[100%] mt-4 h-10 rounded-lg flex items-center justify-center gap-2 text-white leading-10'>
                        <img src={EDIT} alt="" />
                        {t("edit")}
                    </button>
                </table>


                <Rodal height={550} visible={visible} onClose={() => setVisible(!visible)}>
                    <p className='text-lg leading-5 font-bold'>{dataTeacher?.firstName + " " + dataTeacher?.lastName}</p>
                    <hr />
                    <div className='flex flex-col items-stretch justify-center gap-3'>
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
                        <SELECTJOB value={jobName} setValue={setJobName} />
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
                    <BUTTON buttonFunction={editUseersData} name={t("save")} active />
                </Rodal>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ProfilePersonnel
