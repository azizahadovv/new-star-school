import React, { useEffect, useState } from "react";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { useNavigate } from "react-router-dom";
import { arrowRight, editBlue, menuDots, searchImg, trash } from "../icons";
import { useSelector } from "react-redux";
import { LOADER, SEARCH, SELECTCLASSNUMBER } from "../ui";
import student_Page_Function from "../service/student";
import { ToastContainer, toast } from "react-toastify";
import Avatar from "../../../shared/Avatar";
import Pagination from "../../../shared/Pagination";
import Empty from "../../../shared/Empty";
import { useTranslation } from "react-i18next";
import { useQueryParam, useQueryNumber } from "../../../shared/useQueryState";

function Students() {
  const { t } = useTranslation()
  const open = useSelector((sel) => sel.sidebarReduser.open);
  // Filter/qidiruv/sahifa — URL'da saqlanadi (refreshda yo'qolmaydi)
  const [searchValue, setSearcheValue] = useQueryParam('q', '')
  const navigate = useNavigate()
  const [classesNumber, setClassesNumber] = useQueryParam('class', '')
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useQueryNumber('page', 1)
  const PER_PAGE = 8
  useEffect(() => {
    // Refreshda saqlangan filter/qidiruv bo'lsa — natijalarni qayta yuklaymiz
    if (searchValue || classesNumber) {
      searchStudent()
    } else {
      getStudents()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const getStudents = async () => {
    try {
      const students = await student_Page_Function.get_All_Student()
      setStudents(students || [])
    } catch (error) {
      console.log("error get student" + error);
    } finally {
      setLoading(false)
    }
  }
  const totalPages = Math.ceil((students?.length || 0) / PER_PAGE)
  const pagedStudents = students?.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  // Filtrlangan natija qisqarsa va joriy sahifa chegaradan oshsa — to'g'rilaymiz
  useEffect(() => {
    if (totalPages > 0 && page > totalPages) setPage(totalPages)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages])
  const searchStudent = async () => {
    try {
      const result = await student_Page_Function.search_Student(classesNumber, searchValue)
      setStudents(result || []);
    } catch (error) {
      toast.error(error.message)
    }
  }
  // Yangi qidiruv — har doim 1-sahifadan boshlaymiz
  const runSearch = () => {
    setPage(1)
    searchStudent()
  }
  const removeStudent = async (id, name) => {
    const verification = window.confirm(`Are you sure you want to archiving ${name}?`);
    try {
      if (verification) {
        await student_Page_Function.remove_Student(id,name)
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
            <SEARCH searchValue={searchValue} setSearcheValue={setSearcheValue} searchFunction={runSearch} placeholder={t('placeholder_search')} />
            <SELECTCLASSNUMBER classesNumber={classesNumber} setClassesNumber={setClassesNumber} />
          </div>
          <button onClick={runSearch} className="border border-brGray rounded-xl h-10 w-10 flex items-center justify-center">
            <img src={searchImg} alt="searchImg" />
          </button>
        </div>

      </div>
      <div
        className={`${styleTopBarUINoFlex} ${open ? "hidden" : "block"
          } min-h-96 overflow-scroll p-3`}
      >
        {
          loading ? <div className="flex items-center justify-center min-h-32"> <LOADER /></div> : students?.length === 0 ? <Empty title={t("table_pupils")} subtitle="—" /> : <table className="table table-hover table-cards">
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
              {pagedStudents?.map((item, id) => {
                return (
                  <tr key={id}>
                    <th scope="row">{(page - 1) * PER_PAGE + id + 1}</th>
                    <td data-label={t("table_pupils")}>
                      <p className="min-w-max h-full flex items-center justify-start gap-3 min-h-max text-[15px] font-normal">
                        <Avatar src={item?.imageUrl} name={[item?.firstName, item?.lastName].filter(Boolean).join(' ')} size={40} />
                        {[item?.lastName, item?.firstName, item?.patronymic].filter(Boolean).join(' ')}
                      </p>
                    </td>
                    <td data-label={t("table_classes")}>
                      <p className="min-w-max h-full">{item?.grade}</p>
                    </td>
                    <td data-label={t("table_number")}>
                      <p className="min-w-max h-full">{item?.phoneNumber}</p>
                    </td>
                    <td data-label={t("additional_phone_number")}>
                      <p className="min-w-max h-full">{item?.parentPhoneNumber}</p>
                    </td>
                    <td data-label={t("active_table")}>
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
                            <button onClick={() => removeStudent(item?.id, [item?.lastName, item?.firstName, item?.patronymic].filter(Boolean).join(' '))} className="dropdown-item d-flex align-items-center gap-2">
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
        {!loading && students?.length > 0 && (
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        )}
      </div>

    </div>
  );
}

export default Students;
