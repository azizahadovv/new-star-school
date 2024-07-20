import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { BUTTON, SEARCH } from "../ui";
import { arrowRight, editBlue, menuDots, trash } from "../icons";
import { useSelector } from "react-redux";
import studentFunction from "../service/function-student";
import { toast, ToastContainer } from "react-toastify";

function ListOfClassesID() {
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
            name={"O‘quvchi qo‘shish"}
            active
          />
        </div>
      </div>

      <div
        className={`${styleTopBarUINoFlex} ${
          open ? "hidden" : "block"
        } min-h-96 overflow-scroll p-3`}
      >
        <table className="table table-hover">
          <thead>
            <tr>
              <th>№</th>
              <th>O‘quvchi</th>
              <th>login parol</th>
              <th>Telefon raqam</th>
              <th>Qo'shimcha</th>
              <th>Active</th>
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
                      <Link
                        to={""}
                        className="flex items-center justify-center gap-2 no-underline"
                      >
                        Batafsil <img src={arrowRight} alt="" />
                      </Link>
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
                          <button className="dropdown-item d-flex align-items-center  gap-2 border-b border-brGray">
                            <img src={editBlue} width={18} alt="editBlue" />
                            Tahrirlash
                          </button>
                          <button className="dropdown-item d-flex align-items-center gap-2">
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

export default ListOfClassesID;
