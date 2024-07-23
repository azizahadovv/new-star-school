import React, { useEffect, useState } from 'react'
import { Container, styleTopBarUINoFlex } from '../constanta/style'
import { BUTTON } from '../ui'
import { ICONIMG } from '../icons'
import student_Page_Function from '../service/student'

function StudentProfile() {
    const [dataStudent, setDataStudent] = useState({})
    useEffect(() => {
        get_datas_Student()
    }, [])
    const get_datas_Student = async () => {
        const id = localStorage.getItem('StudentId')
        try {
            const response = await student_Page_Function.get_student_in_Id(id)
            setDataStudent(response)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className={`${Container} flex tablet:items-start minMobil:items-center tablet:justify-start minMobil:justify-center gap-3 flex-wrap`}>
            <div className={`${styleTopBarUINoFlex} w-[300px] h-[380px] p-3 rounded-3xl flex items-center justify-between flex-col`}>
                <div className='w-full h-[80%] flex items-center justify-center rounded-xl overflow-hidden'>
                    {
                        dataStudent.image === null ? <div className='w-40 h-40 flex items-center justify-center rounded-full overflow-hidden bg-blue uppercase'>
                            <span className='text-6xl text-white flex items-center justify-center'>{dataStudent.firstName.charAt(0) + "." + dataStudent.lastName.charAt(0)}</span>
                        </div> : <img src={dataStudent.image} alt="" />
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
                            <th className='w-50'>{dataStudent.firstName}</th>
                        </tr>  <tr>
                            <th className='w-50'>Familiya:</th>
                            <th className='w-50'>{dataStudent.lastName}</th>

                        </tr>  <tr>
                            <th className='w-50'>Otasining ismi:</th>
                            <th className='w-50'>{dataStudent.patronymic}</th>

                        </tr>  <tr>
                            <th className='w-50'>Tug‘ilgan sana:</th>
                            <th className='w-50'>{dataStudent.birthDate}</th>

                        </tr>  <tr>
                            <th className='w-50'>Jins:</th>
                            <th className='w-50'>{dataStudent.gender}</th>

                        </tr>  <tr>
                            <th className='w-50'>Millat:</th>
                            <th className='w-50'>{dataStudent.nationality}</th>

                        </tr>  <tr>
                            <th className='w-50'>Davlat:</th>
                            <th className='w-50'>{dataStudent.country}</th>

                        </tr>  <tr>
                            <th className='w-50'>Viloyat:</th>
                            <th className='w-50'>{dataStudent.region}</th>

                        </tr>  <tr>
                            <th className='w-50'>Tuman:</th>
                            <th className='w-50'>{dataStudent.district}</th>

                        </tr>  <tr>
                            <th className='w-50'>Uy manzili:</th>
                            <th className='w-50'>{dataStudent.address}</th>

                        </tr>  <tr>
                            <th className='w-50'>Sinf:</th>
                            <th className='w-50'>{dataStudent.grade}</th>

                        </tr>  <tr>
                            <th className='w-50'>Telefon raqam:</th>
                            <th className='w-50'>{dataStudent.phoneNumber}</th>

                        </tr>
                        <tr>
                            <th className='w-50'>Ota-onasining telefon raqami:</th>
                            <th className='w-50'>{dataStudent.parentPhoneNumber}</th>

                        </tr>
                        <tr>
                            <th className='w-50'>Login:</th>
                            <th className='w-50'>{dataStudent.login}</th>

                        </tr>
                        <tr>
                            <th className='w-50'>Parol:</th>
                            <th className='w-50'>{dataStudent.password}</th>

                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default StudentProfile