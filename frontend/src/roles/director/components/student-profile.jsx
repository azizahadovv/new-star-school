import React, { useEffect, useState } from 'react'
import { Container, styleTopBarUINoFlex } from '../constanta/style'
import { BUTTON } from '../ui'
import { ICONIMG } from '../icons'
import { useNavigate, useParams } from 'react-router-dom'
import studentsController from '../service/student'
import { useTranslation } from 'react-i18next'

function StudentProfile() {
    const {t}=useTranslation()
    const navigate = useNavigate()
    const [dataStudent, setDataStudent] = useState({})
    const { id } = useParams()

    useEffect(() => {
        get_data_Students()
    }, [])


    const get_data_Students = async () => {
        try {
            const res = await studentsController.getStudentInId(id)
            setDataStudent(res)
        } catch (error) {
            console.log(error);
            navigate(-2)
        }
    }


    return (
        <div key={dataStudent.id} className={`${Container} flex tablet:items-start minMobil:items-center tablet:justify-start minMobil:justify-center gap-3 flex-wrap`}>
            <div className={`${styleTopBarUINoFlex} w-[300px] h-[380px] p-3 rounded-3xl flex items-center justify-between flex-col`}>
                <div className='w-full h-[80%] flex items-center justify-center rounded-xl overflow-hidden cursor-pointer'>
                    {
                        dataStudent?.image === null || dataStudent?.image === "" ? <div className='w-40 h-40 flex items-center justify-center rounded-full overflow-hidden bg-blue uppercase'>
                            <span className='text-6xl text-white flex items-center justify-center'>{dataStudent?.firstName.charAt(0) + "." + dataStudent?.lastName.charAt(0)}</span>
                        </div> : <img src={dataStudent?.image} alt="" />
                    }
                </div>
                <BUTTON img={ICONIMG} name={'Tahrirlash'} />
            </div>
            <div className={`${styleTopBarUINoFlex} tablet:w-3/4 minMobil:w-full min-h-20 px-3 py-2`}>
                <div className='flex items-center justify-start min-h-16 border-b border-brGray mb-3'>
                    <h3 className='text-blue font-bold'>{t("personal_information")}</h3>
                </div>
                <table className="table table-striped table-hover">
                    <tbody>
                        <tr>
                            <th className='w-50'>{t("firstName")}:</th>
                            <th className='w-50'>{dataStudent?.firstName}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t("lastName")}:</th>
                            <th className='w-50'>{dataStudent?.lastName}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t("patronymic")}:</th>
                            <th className='w-50'>{dataStudent?.patronymic}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t("birthday")}:</th>
                            <th className='w-50'>{dataStudent?.birthDate}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t("gender")}:</th>
                            <th className='w-50'>{dataStudent?.gender}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t("nation")}:</th>
                            <th className='w-50'>{dataStudent?.nationality}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t("state")}:</th>
                            <th className='w-50'>{dataStudent?.country}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t("province")}:</th>
                            <th className='w-50'>{dataStudent?.region}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t("district")}:</th>
                            <th className='w-50'>{dataStudent?.district}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t("home_address")}:</th>
                            <th className='w-50'>{dataStudent?.address}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t("phone_number")}:</th>
                            <th className='w-50'>{dataStudent?.phoneNumber}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t("additional_phone_number")}:</th>
                            <th className='w-50'>{dataStudent?.parentPhoneNumber}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t("login")}:</th>
                            <th className='w-50'>{dataStudent?.login}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t("password")}:</th>
                            <th className='w-50'>{dataStudent?.password}</th>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default StudentProfile