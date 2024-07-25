import React, { useEffect, useState } from 'react'
import { Container, styleTopBarUINoFlex } from '../constanta/style'
import { BUTTON, LOADER, SEARCH, SELECTSCINES } from '../ui'
import { useNavigate } from 'react-router-dom'
import { arrowRight, editBlue, menuDots, trash } from '../icons'
import { useSelector } from 'react-redux'
import teacherController from '../service/teacher'

function Teacher() {
  const navigate = useNavigate()
  const open = useSelector(sel => sel.sidebarReduser.open)
  const [dataTeachers, setDataTeachers] = useState(null)

  useEffect(() => {
    getTeachers();
  }, []);
  const getTeachers = async () => {
    try {
      const teachersData = await teacherController.getTeacher()
      setDataTeachers(teachersData);
    } catch (error) {
      console.log('getTeachers error', error);
    }
  }
  const remove_Teacher = async (teacherId, name) => {
    const chack = window.confirm(` Do you really want to remove ${name}?`)
    try {
      if (chack) {
        await teacherController.removeTeacher(teacherId);
        getTeachers();
      }

    } catch (error) {
      console.log('remove_Teacher error', error);
    }
  }
  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUINoFlex} min-h-20 flex items-center justify-between tablet:px-3 minMobil:px-1 overflow-scroll`}>
        <div className='tablet:w-1/2 minMobil:min-w-[350px] flex gap-3 mr-[150px]'>
          <div className='tablet:w-2/3 minMobil:min-w-80'><SEARCH placeholder='O‘qituvchi bo‘ylab izlash' /></div>
          <div className='tablet:w-3/12 minMobil:min-w-36'><SELECTSCINES /></div>
        </div>
        <div className='min-w-28'>
          <BUTTON buttonFunction={() => navigate('/add-teachers')} active name={'O‘qituvchi qo‘shish'} />
        </div>
      </div>
      <div className={`${styleTopBarUINoFlex} min-h-96 overflow-scroll p-3`}>
        {
          !dataTeachers ? <div className='flex items-center justify-center mt-5'>
            < LOADER />
          </div> : <table className={`table table-hover ${open ? 'hidden' : 'flex'}`}>
            <thead>
              <tr>
                <th>№</th>
                <th>O‘qituvchi</th>
                <th>Fan</th>
                <th>Tug’ilgan sanasi</th>
                <th>Telefon raqam</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {
                dataTeachers?.map((item, id) => {
                  return <tr key={id}>
                    <th scope="row">{id + 1}</th>
                    <td>
                      <p className='w-[270px]'>{item.firstName + " " + item.lastName + " " + item.patronymic}</p>
                    </td>
                    <td>
                      <p className='w-[150px]'>{item.subject}</p>
                    </td>
                    <td>
                      <p className='w-[110px]'>{item.birthDate}</p>
                    </td>
                    <td>
                      <p className='min-w-max'>{item.phoneNumber}</p>
                    </td>
                    <td>
                      <div className='w-[150px] flex items-center justify-between relative'>
                        <button onClick={() => {
                          navigate(`/teachers/${item.id}`)
                          localStorage.setItem("TeacherId", item.id)
                        }}
                          className="flex items-center justify-center gap-2 text-blue"
                        >
                          Batafsil <img width={7} src={arrowRight} alt="arrow" />
                        </button>
                        <div className="dropdown">
                          <button
                            className="flex items-center justify-center"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <img
                              src={menuDots}
                              width={23}
                              className=" p-1"
                              alt="menuDots"
                            />
                          </button>
                          <div className={`dropdown-menu`}>
                            <button onClick={() => { navigate(`/add-teachers/${item.id}`) }} className="dropdown-item d-flex align-items-center gap-2">
                              <img src={editBlue} width={20} alt="trash" />
                              Tahrirlash
                            </button>
                            <button onClick={() => remove_Teacher(item.id, item.firstName + " " + item.lastName + " " + item.patronymic)} className="dropdown-item d-flex align-items-center gap-2">
                              <img src={trash} width={20} alt="trash" />
                              O‘chirish
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        }
      </div>
    </div >
  )
}

export default Teacher