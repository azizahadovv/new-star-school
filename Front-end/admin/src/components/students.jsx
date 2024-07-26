import React, { useEffect, useState } from "react";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { useNavigate } from "react-router-dom";
import { arrowRight, editBlue, menuDots, trash } from "../icons";
import { useSelector } from "react-redux";
import { SEARCH, SELECTCLASSNUMBER } from "../ui";
import student_Page_Function from "../service/student";
import { ToastContainer, toast } from "react-toastify";

function Students() {
  const open = useSelector((sel) => sel.sidebarReduser.open);
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
      <div className={`${styleTopBarUINoFlex} min-h-20 flex items-center justify-start px-3`}>
        <div className="w-96">
          <SEARCH placeholder="O‘quvchi bo‘ylab izlash" />
        </div>
        <div className="w-96">
          <SELECTCLASSNUMBER classesNumber={classesNumber} setClassesNumber={setClassesNumber} />
        </div>
      </div>
      <div
        className={`${styleTopBarUINoFlex} ${open ? "hidden" : "block"
          } min-h-96 overflow-scroll p-3`}
      >
        <table className="table table-hover">
          <thead>
            <tr>
              <th>№</th>
              <th>O‘quvchi</th>
              <th>Sinf</th>
              <th>Telefon raqam</th>
              <th>Qo'shimcha</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((item, id) => {
              return (
                <tr key={id}>
                  <th scope="row">{id + 1}</th>
                  <td className="relative">
                    <p className="min-w-max h-full">
                      {item.lastName + ' ' + item.firstName + ' ' + item.patronymic}
                    </p>
                  </td>
                  <td>
                    <p className="min-w-max h-full">{item.grade}</p>
                  </td>
                  <td>
                    <p className="min-w-max h-full">{item.phoneNumber}</p>
                  </td>
                  <td>
                    <p className="min-w-max h-full">{item.parentPhoneNumber}</p>
                  </td>
                  <td>
                    <div className="min-w-max h-full leading-5 flex items-center justify-between relative">
                      <button onClick={() => {
                        navigate(`/students/${item.id}`)
                        localStorage.setItem("StudentId", item.id)
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
                          <button onClick={() => { navigate(`/add-student/${item.id}`) }} className="dropdown-item d-flex align-items-center gap-2">
                            <img src={editBlue} width={20} alt="trash" />
                            Tahrirlash
                          </button>
                          <button onClick={() => removeStudent(item.id, item.lastName + ' ' + item.firstName + ' ' + item.patronymic)} className="dropdown-item d-flex align-items-center gap-2">
                            <img src={trash} width={20} alt="trash" />
                            O‘chirish
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
      </div>
      <ToastContainer />
    </div>
  );
}

export default Students;
