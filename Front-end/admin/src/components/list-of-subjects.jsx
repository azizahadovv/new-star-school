import { useEffect, useState } from "react";
import Rodal from "rodal";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { editBlue, menuDots, trash } from "../icons";
import { BUTTON, INPUT, LOADER, SEARCH } from "../ui";
import subjectFunction from "../service/subjects";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../slice/class";
import { useTranslation } from "react-i18next";

function ListOfSubjects() {
  const {t}=useTranslation()
  const dispatch = useDispatch();
  const open = useSelector((sel) => sel.sidebarReduser.open);
  const visible = useSelector((sel) => sel.addclass.visible);
  const [subject, setSubject] = useState(null);
  const [editControl, setEditControl] = useState('');
  const [idControl, setIdControl] = useState('');
  const [nameSubject, setNameSubject] = useState('');
  useEffect(() => {
    getSubjects();
  }, []);
  const postSubjects = async () => {
    if (editControl !== "") {
      if (nameSubject !== "") {
        try {
          await subjectFunction.changeSubject(idControl, {
            name: nameSubject
          })
          setEditControl('')
          setNameSubject('')
          dispatch(showModal())
          toast.success("Subject updated successfully")
        } catch (error) {
          toast.error("Error Update subject" + error)
        }
      }
    } else {
      try {
        await subjectFunction.addSubject({
          name: nameSubject
        })
        dispatch(showModal())
        setNameSubject("")
        toast.success("Subject added successfully")
        editControl('')
        setNameSubject('')
      } catch (error) {
        console.log("Error Add subject" + error)
      }
    }
    getSubjects();
  }

  const changeSubject = async (data) => {
    dispatch(showModal())
    setEditControl(data)
    setIdControl(data.id)
    setNameSubject(data.name)
  }


  const getSubjects = async () => {
    try {
      const response = await subjectFunction.getSubjects();
      setSubject(response);
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (id) => {
    const deleted = window.confirm("do you really want to delete?")
    try {
      if (deleted) {
        await subjectFunction.removeSubject(id);
        toast.success("deleted successfully")
        getSubjects();
      } else {
        toast.info("was not deleted")
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`${Container}`}>
      <div
        className={`${styleTopBarUINoFlex} min-h-20 px-3 flex items-center justify-between overflow-scroll`}
      >
        <div className="min-w-[300px]">
          <SEARCH />
        </div>
        <div className="min-w-40">
          <BUTTON buttonFunction={() => dispatch(showModal())} name={t("creating_sciences")} active />
        </div>
      </div>
      <div className={`${styleTopBarUINoFlex} min-h-96 px-3 ${open?"hidden":"block"}`}>
        {!subject ? (
          <div className="flex items-center justify-center py-5">
            <LOADER />
          </div>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>№</th>
                <th>{t("name_subjects")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                subject.map((res, id) => {
                  return <tr key={res.id}>
                    <td>{id + 1}</td>
                    <td>{res.name}</td>
                    <td>
                      <button
                        className="btn"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src={menuDots} width={25} className=" p-1" alt="menuDots" />
                      </button>
                      <ul className="dropdown-menu bg-light">
                        <button onClick={() => changeSubject(res)} className="dropdown-item d-flex align-items-start border-brGray">
                          <img src={editBlue} width={18} alt="editBlue" />
                          {t("edit")} 
                        </button>
                        <button
                          onClick={() => removeItem(res.id)}
                          className="dropdown-item d-flex align-items-start"
                        >
                          <img src={trash} width={20} alt="trash" />
                          {t("delete")}
                        </button>
                      </ul>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        )}
        <Rodal
          height={220}
          visible={visible}
          onClose={() => dispatch(showModal())}
        >
          <div className="w-full h-full">
            <p className="text-xl border-b border-brGray leading-10 font-bold text-textBlack">
              Fan qo‘shish
            </p>
            <div className="flex flex-col items-start justify-between h-28">
              <div className="flex items-center justify-between w-full gap-3">
                <INPUT value={nameSubject} setValue={setNameSubject} width={370} placeholder={'Nomini kiriting'} />
              </div>
              <BUTTON
                name={"Saqlash"}
                active
                buttonFunction={postSubjects}
              />
            </div>
          </div>
        </Rodal>
      </div>
      
    </div>
  );
}

export default ListOfSubjects;




/* 
**************************qo'shish


*/

/* 
**************************** edit qilish




*/