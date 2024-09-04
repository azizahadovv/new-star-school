import React, { useEffect, useState } from 'react'
import { Container, styleTopBarUINoFlex } from '../constanta/style'
import { BUTTON, LOADER, SEARCH, SELECTSCINES } from '../ui'
import { useNavigate } from 'react-router-dom'
import { arrowRight, editBlue, menuDots, searchImg, trash } from '../icons'
import { useSelector } from 'react-redux'
import teacherController from '../service/teacher'
import { useTranslation } from 'react-i18next'

function Teacher() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const open = useSelector(sel => sel.sidebarReduser.open)
  const [dataTeachers, setDataTeachers] = useState([])
  const [searchValue, setSearcheValue] = useState('')
  const [value, setValue] = useState('')
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

  const searchTeacher = async () => {
    try {
      await teacherController.searchTeacher(searchValue, value).then((teacher) => {
        setDataTeachers(teacher);
      })
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUINoFlex} min-h-20 flex items-center tablet:justify-between minMobil:justify-center minMobil:py-3 flex-wrap tablet:px-3 minMobil:px-1 overflow-scroll`}>
        <div className='min-w-max flex items-center justify-center gap-3 '>
          <div className='tablet:w-2/3 minMobil:min-w-80'><SEARCH searchValue={searchValue} setSearcheValue={setSearcheValue} placeholder='FI bo‘ylab izlash' /></div>
          <div className='tablet:w-3/12 minMobil:min-w-36'><SELECTSCINES value={value} setValue={setValue} /></div>
          <button onClick={searchTeacher} className="border border-brGray rounded-xl h-10 w-10 flex items-center justify-center">
            <img src={searchImg} alt="searchImg" />
          </button>
        </div>
        <div className='min-w-28'>
          <BUTTON buttonFunction={() => navigate('/add-teachers')} active name={t("add_teacher")} />
        </div>
      </div>
      <div className={`${styleTopBarUINoFlex} min-h-96 overflow-scroll p-3`}>
        {
          dataTeachers?.length === 0 ? <div className='flex items-center justify-center mt-5'>
            < LOADER />
          </div> : <table className={`table table-hover ${open ? 'hidden' : 'flex'}`}>
            <thead>
              <tr>
                <th>№</th>
                <th>{t("table_teacher")}</th>
                <th>{t("table_subject")}</th>
                <th>{t("birthday")}</th>
                <th>{t("phone_number")}</th>
                <th>{t("active_table")}</th>
              </tr>
            </thead>
            <tbody>
              {
                dataTeachers?.map((item, id) => {
                  return <tr key={item?.id}>
                    <th scope="row">{id + 1}</th>
                    <td>
                      <p className='w-[270px] flex items-center justify-start gap-2 min-h-max text-lg font-normal'>  <img className={`w-10 h-10 rounded-full ${!item?.imageUrl && 'hidden'}`} src={item?.imageUrl} alt="#" />{item?.firstName + " " + item?.lastName + " " + item?.patronymic}</p>
                    </td>
                    <td>
                      <p className='w-[150px]'>{item?.subject?.map(i => <span key={i?.id}>{i?.name}</span>)}</p>
                    </td>
                    <td>
                      <p className='w-[110px]'>{item?.birthDate}</p>
                    </td>
                    <td>
                      <p className='min-w-max'>{item?.phoneNumber}</p>
                    </td>
                    <td>
                      <div className='w-[150px] flex items-center justify-between relative'>
                        <button onClick={() => {
                          navigate(`/teacher-profile/${item?.id}`)
                          localStorage.setItem("TeacherId", item?.id)
                        }}
                          className="flex items-center justify-center gap-2 text-blue"
                        >
                          {t("table_more")} <img width={7} src={arrowRight} alt="arrow" />
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
                            <button onClick={() => { navigate(`/add-teachers/${item?.id}`) }} className="dropdown-item d-flex align-items-center gap-2">
                              <img src={editBlue} width={20} alt="trash" />
                              {t("edit")}
                            </button>
                            <button onClick={() => remove_Teacher(item?.id, item?.firstName + " " + item?.lastName + " " + item?.patronymic)} className="dropdown-item d-flex align-items-center gap-2">
                              <img src={trash} width={20} alt="trash" />
                              {t("delete")}
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