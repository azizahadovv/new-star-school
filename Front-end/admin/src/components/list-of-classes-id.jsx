import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { BUTTON, SEARCH } from "../ui";
import { arrowRight,menuDots, trash } from "../icons";
import { useSelector } from "react-redux";
import studentFunction from "../service/function-class-student";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

function ListOfClassesID() {
  const {t}=useTranslation()
  const navigate = useNavigate();
  const [dataStudent, setDataStudent] = useState();
  const open = useSelector((sel) => sel.sidebarReduser.open);
  useEffect(() => {
    getStudentsData();
  }, []);

  const getStudentsData = async () => {
    try {
      const studentData = await studentFunction.getStudent();
      setDataStudent(studentData.students);
    } catch (error) {
      console.log("Error axios get student id ", error);
      toast.error(error.message, "Error axios get student id ");
    }
  };

  const deleteStudentInClass = async (id, name) => {
    const classId = localStorage.getItem("ClassId");
    const prompt = window.confirm(`Are you sure you want to delete ${name}?`);
    try {
      if (prompt) {
        await studentFunction.removeStudentInClass(id, classId);
        getStudentsData();
        toast.success(`student named ${name} was deleted`);
      } else {
        toast.info("Operation cancelled");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, "Error");
    }
  };

  return (
    <div className={`${Container}`}>
      <div
        className={`${styleTopBarUINoFlex} h-20 w-full px-3 flex items-center justify-between`}
      >
        <div className="tablet:w-1/4">
          <SEARCH />
        </div>
        <div>
          <BUTTON
            buttonFunction={() => {
              navigate("/add-student");
            }}
            name={t("add_student")}
            active
          />
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
              <th>{t("student_home")}</th>
              <th>{t("login_parol")}</th>
              <th>{t("phone_number")}</th>
              <th>{t("additional_phone_number")}</th>
              <th>{t("active_table")}</th>
            </tr>
          </thead>
          <tbody>
            {dataStudent?.map((item, id) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{id + 1}</th>
                  <td className="relative">
                    <p className="w-[270px] static left-0 top-0">
                      {item.lastName +
                        " " +
                        item.firstName +
                        " " +
                        item.patronymic}
                    </p>
                  </td>
                  <td>
                    <p className="w-[150px]">
                      {item.login + "--" + item.password}
                    </p>
                  </td>
                  <td>
                    <p className="w-[110px]">{item.phoneNumber}</p>
                  </td>
                  <td>
                    <p className="min-w-max">{item.parentPhoneNumber}</p>
                  </td>
                  <td>
                    <div className="w-[150px] flex items-center justify-between relative">
                      <button onClick={() => {
                        navigate(`/students/${item.id}`)
                        localStorage.setItem("StudentId", item.id)
                      }}
                        className="flex items-center justify-center gap-2 text-blue"
                      >
                       {t("table_more")}<img width={7} src={arrowRight} alt="arrow" />
                      </button>
                      <div className="dropdown">
                        <button
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <img
                            src={menuDots}
                            width={25}
                            className=" p-1"
                            alt="menuDots"
                          />
                        </button>
                        <div className={`dropdown-menu`}>
                          <button
                            onClick={() =>
                              deleteStudentInClass(
                                item.id,
                                item.lastName +
                                " " +
                                item.firstName +
                                " " +
                                item.patronymic
                              )
                            }
                            className="dropdown-item d-flex align-items-center gap-2"
                          >
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
      </div>
      <ToastContainer />
    </div>
  );
}

export default ListOfClassesID;
