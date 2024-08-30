import React, { useEffect, useState } from "react";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { useNavigate } from "react-router-dom";
import { arrowRight, editBlue, menuDots, searchImg, trash } from "../icons";
import { useSelector } from "react-redux";
import { LOADER, SEARCH, SELECTCLASSNUMBER } from "../ui";
import student_Page_Function from "../service/student";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function Students() {
  const { t } = useTranslation()
  const open = useSelector((sel) => sel.sidebarReduser.open);
  const [searchValue, setSearcheValue] = useState('')
  const navigate = useNavigate()
  const [classesNumber, setClassesNumber] = useState('')
  const [students, setStudents] = useState([])
  useEffect(() => {
    getStudents()
  }, [])
  const getStudents = async () => {
    try {
      const students = await student_Page_Function.get_All_Student()
      setStudents(students)
    } catch (error) {
      console.log("error get student" + error);
    }
  }
  const searchStudent = async () => {
    try {
      student_Page_Function.search_Student(classesNumber, searchValue).then((result) => {
        setStudents(result);
      })
    } catch (error) {
      toast.error(error.message)
    }
  }
  const removeStudent = async (id, name) => {
    const verification = window.confirm(`Are you sure you want to delete ${name}?`);
    try {
      if (verification) {
        await student_Page_Function.remove_Student(id)
        toast.success(`${name} has been deleted`)
        getStudents()
      } else {
        toast.info("O'chirish uchun xabar berilmadi")
      }
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUINoFlex} min-h-20 flex items-center justify-start px-3 overflow-scroll`}>
        <div className="min-w-max flex items-start justify-start gap-3 px-3">
          <div className="flex gap-3 min-w-[550px]">
            <SEARCH searchValue={searchValue} setSearcheValue={setSearcheValue} searchFunction={searchStudent} placeholder="O‘quvchi bo‘ylab izlash" />
            <SELECTCLASSNUMBER classesNumber={classesNumber} setClassesNumber={setClassesNumber} />
          </div>
          <button onClick={searchStudent} className="border border-brGray rounded-xl h-10 w-10 flex items-center justify-center">
            <img src={searchImg} alt="searchImg" />
          </button>
        </div>

      </div>
      <div
        className={`${styleTopBarUINoFlex} ${open ? "hidden" : "block"
          } min-h-96 overflow-scroll p-3`}
      >
        {
          students?.length === 0 ? <div className="flex items-center justify-center min-h-32"> <LOADER /></div> : <table className="table table-hover">
            <thead>
              <tr>
                <th>№</th>
                <th>{t("table_pupils")}</th>
                <th>{t("table_classes")}</th>
                <th>{t("table_number")}</th>
                <th>{t("additional_phone_number")}</th>
                <th>{t("active_table")}</th>
              </tr>
            </thead>
            <tbody>
              {students?.map((item, id) => {
                return (
                  <tr key={id}>
                    <th scope="row">{id + 1}</th>
                    <td>
                      <p className="min-w-max h-full flex items-center justify-start gap-2 min-h-max text-lg font-normal">
                        <img className='w-10 h-10 bg-center rounded-full' hidden={item?.image ? false : true} src={item?.image && item?.image} alt="item?.image && item.image" />
                        {item?.lastName + ' ' + item?.firstName + ' ' + item?.patronymic}
                      </p>
                    </td>
                    <td>
                      <p className="min-w-max h-full">{item?.grade}</p>
                    </td>
                    <td>
                      <p className="min-w-max h-full">{item?.phoneNumber}</p>
                    </td>
                    <td>
                      <p className="min-w-max h-full">{item?.parentPhoneNumber}</p>
                    </td>
                    <td>
                      <div className="min-w-max h-full leading-5 flex items-center justify-between relative">
                        <button onClick={() => {
                          navigate(`/students/${item?.id}`)
                          localStorage.setItem("StudentId", item?.id)
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
                            <button onClick={() => { navigate(`/add-student/${item.id}`) }} className="dropdown-item d-flex align-items-center gap-2">
                              <img src={editBlue} width={20} alt="trash" />
                              {t("edit")}
                            </button>
                            <button onClick={() => removeStudent(item?.id, item?.lastName + ' ' + item?.firstName + ' ' + item?.patronymic)} className="dropdown-item d-flex align-items-center gap-2">
                              <img src={trash} width={20} alt="trash" />
                              {t("delete")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        }
      </div>
      <ToastContainer />
    </div>
  );
}

export default Students;
