import React, { useState } from "react";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { Link } from "react-router-dom";
import { arrowRight, editBlue, menuDots, trash } from "../icons";
import { useSelector } from "react-redux";
import { SEARCH, SELECTCLASSNUMBER } from "../ui";

function Students() {
  const open = useSelector((sel) => sel.sidebarReduser.open);
  const [classesNumber,setClassesNumber] = useState('')
console.log(classesNumber);
  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUINoFlex} min-h-20 flex items-center justify-start px-3`}>
        <div className="w-96">
        <SEARCH placeholder="O‘quvchi bo‘ylab izlash" />
        </div>
        <div className="w-96">
        <SELECTCLASSNUMBER setClassesNumber={setClassesNumber} />
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
              <th>Sinf</th>
              <th>Telefon raqam</th>
              <th>Qo'shimcha</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {/* {dataStudent?.map((item,id) => { */}
            {/* return ( */}
            <tr>
              <th scope="row">1</th>
              <td className="relative">
                <p className="min-w-max h-full">
                  {/* {item.lastName + ' ' + item.firstName+ ' ' + item.patronymic} */}
                  Kamolov Xasan Muhiddin o‘g‘li
                </p>
              </td>
              <td>
                <p className="min-w-max h-full">9B guruh</p>
              </td>
              <td>
                <p className="min-w-max h-full">+998 90 774 41 41</p>
              </td>
              <td>
                <p className="min-w-max h-full">+998 90 774 41 41</p>
              </td>
              <td>
                <div className="min-w-max h-full leading-5 flex items-center justify-between relative">
                  <Link
                    to={""}
                    className="flex items-center justify-center gap-2 no-underline"
                  >
                    Batafsil <img width={7} src={arrowRight} alt="arrowRight" />
                  </Link>
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
            {/* );
        })} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;
