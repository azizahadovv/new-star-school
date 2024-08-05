import { useEffect, useState } from "react";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { BUTTON, LOADER, SEARCH } from "../ui";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import personnel_controllers from "../service/personnel";
import { arrowRight, editBlue, menuDots, trash } from "../icons";

function Personnel() {
  const { t } = useTranslation()
  const open = useSelector((sel) => sel.sidebarReduser.open);
  const [searchValue, setSearcheValue] = useState('')
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  useEffect(() => {
    getDatapersonne()
  }, [])


  const getDatapersonne = async () => {
    try {
      const data = await personnel_controllers.getDataPersons()
      setStudents(data)
    } catch (error) {

    }

  }
  const deleteItem = async (id) => {
    personnel_controllers.deleteData(id)
    getDatapersonne()
  }


  const search_in_names = async (e) => {
    const data = await personnel_controllers.searchdata(e)
    console.log(data);
    setStudents(data)
    setSearcheValue(e)
  }



  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUINoFlex} min-h-20 flex items-center justify-center px-3 overflow-scroll`}>
        <div className="w-full  flex items-center justify-between gap-3 px-3">
          <div className="flex gap-3 min-w-[550px]">
            <SEARCH value={searchValue} setValue={search_in_names} />
          </div>
          <div className=" flex items-center justify-center ">
            <BUTTON buttonFunction={() => navigate('add-personnel')} name={t("add_pernsonnel")} active width='min-w-52' />
          </div>
        </div>

      </div>
      <div
        className={`${styleTopBarUINoFlex} ${open ? "hidden" : "block"
          } min-h-96 overflow-scroll p-3`}
      >
        {
          !students ? <div className="flex items-center justify-center min-h-32"> <LOADER /></div> : <table className="table table-hover">
            <thead>
              <tr>
                <th>№</th>
                <th>{t("table_pupils")}</th>
                <th>{t("table_classes")}</th>
                <th>{t("table_number")}</th>
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
                        <img className='w-10 h-10 bg-center rounded-full' hidden={item?.image ? false : true} src={item?.image && item.image} alt="item?.image && item.image" />
                        {item.lastName + ' ' + item.firstName + ' ' + item.middleName}
                      </p>
                    </td>
                    <td>
                      <p className="min-w-max h-full">{item.profession}</p>
                    </td>
                    <td>
                      <p className="min-w-max h-full">{item.phoneNumber}</p>
                    </td>
                    <td>
                      <div className="min-w-max h-full leading-5 flex items-center justify-between relative">
                        <button onClick={() => {
                          navigate(`${item.id}`)
                          localStorage.setItem("StudentId", item.id)
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
                          <div onClick={() => { deleteItem(item.id) }

                          } className={`dropdown-menu`}>
                            <button onClick={() => "removeStudent(item.id, item.lastName + ' ' + item.firstName + ' ' + item.patronymic)"} className="dropdown-item d-flex align-items-center gap-2">
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

export default Personnel