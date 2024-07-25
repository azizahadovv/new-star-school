import React, { useEffect, useState } from 'react'
import { Container, styleTopBarUINoFlex } from '../constanta/style'
import { BUTTON } from '../ui'
import { ICONIMG } from '../icons'
import teacherController from '../service/teacher'
import { useParams } from 'react-router-dom'

function TeacherProfile() {
    const [dataTeacher, setDataTeacher] = useState({})
    const { id } = useParams()

    useEffect(() => {
        get_datas_Student()
    }, [])


    const get_datas_Student = async () => {
        try {
            const response = await teacherController.getTeacherInId(id)
            setDataTeacher(response)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className={`${Container} flex tablet:items-start minMobil:items-center tablet:justify-start minMobil:justify-center gap-3 flex-wrap`}>
            <div className={`${styleTopBarUINoFlex} w-[300px] h-[380px] p-3 rounded-3xl flex items-center justify-between flex-col`}>
                <div className='w-full h-[80%] flex items-center justify-center rounded-xl overflow-hidden cursor-pointer'>
                    {
                        dataTeacher?.image === null || dataTeacher?.image==="" ? <div className='w-40 h-40 flex items-center justify-center rounded-full overflow-hidden bg-blue uppercase'>
                            <span className='text-6xl text-white flex items-center justify-center'>{dataTeacher?.firstName.charAt(0) + "." + dataTeacher?.lastName.charAt(0)}</span>
                        </div> : <img src={dataTeacher?.image} alt="" />
                    }
                </div>
                <BUTTON img={ICONIMG} name={'Tahrirlash'} />
            </div>
            <div className={`${styleTopBarUINoFlex} tablet:w-3/4 minMobil:w-full min-h-20 px-3 py-2`}>
                <div className='flex items-center justify-start min-h-16 border-b border-brGray mb-3'>
                    <h3 className='text-blue font-bold'>Shaxsiy ma’lumotlar</h3>
                </div>
                <table className="table table-striped table-hover">
                    <tbody>
                        <tr>
                            <th className='w-50'>Ismi:</th>
                            <th className='w-50'>{dataTeacher?.firstName}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>Familiya:</th>
                            <th className='w-50'>{dataTeacher?.lastName}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>Otasining ismi:</th>
                            <th className='w-50'>{dataTeacher?.patronymic}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>Tug‘ilgan sana:</th>
                            <th className='w-50'>{dataTeacher?.birthDate}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>Jins:</th>
                            <th className='w-50'>{dataTeacher?.gender}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>Millat:</th>
                            <th className='w-50'>{dataTeacher?.nationality}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>Davlat:</th>
                            <th className='w-50'>{dataTeacher?.country}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>Viloyat:</th>
                            <th className='w-50'>{dataTeacher?.region}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>Tuman:</th>
                            <th className='w-50'>{dataTeacher?.district}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>Uy manzili:</th>
                            <th className='w-50'>{dataTeacher?.address}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>Telefon raqam:</th>
                            <th className='w-50'>{dataTeacher?.phoneNumber}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>Fan o'qituvchisi:</th>
                            <th className='w-50'>{dataTeacher?.subject}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>Login:</th>
                            <th className='w-50'>{dataTeacher?.login}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>Parol:</th>
                            <th className='w-50'>{dataTeacher?.password}</th>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default TeacherProfile