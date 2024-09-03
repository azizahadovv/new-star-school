import { useDispatch, useSelector } from "react-redux";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import {
  ACTIVECLASSES,
  BUTTON,
  LOADER,
  SELECTCLASSGROUP,
  SELECTCLASSNUMBERS,
} from "../ui";
import { postClass, setClasses, showModal } from "../slice/class";
import Rodal from "rodal";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import functionsClasses from "../service/function-class";
import { useTranslation } from "react-i18next";

function ListOfClasses() {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const open = useSelector((sel) => sel.sidebarReduser.open);
  const [classesNumber, setClassesNumber] = useState("");
  const [classesGroup, setClassesGroup] = useState("");
  const [change, setChange] = useState("");
  const [changeId, setChangeId] = useState("");
  const visible = useSelector((sel) => sel.addclass.visible);
  const getclassData = useSelector((sel) => sel.addclass.class);
  const [classesData, setClassesData] = useState([])


  useEffect(() => {
    getClasses();
  }, []);

  const obj = {
    name: `${classesNumber + classesGroup}-sinf`,
    grade: classesNumber,
    groupLetter: classesGroup,
  };
  const getClasses = async () => {
    try {
      const classesData = await functionsClasses.getClasses();
      setClassesData(classesData)
    } catch (error) {
      console.log(error);
    }
  };
  const removeItem = async (id) => {
    let question = prompt(t("prompt_value"));
    try {
      if (question === "YES") {
        await functionsClasses.removeClass(id);
        toast.success("the class has been deleted");
      }
      getClasses();
    } catch (error) {
      toast.error(error);
    }
  };
  const postClasses = async () => {
    try {
      if (obj.grade != "" && obj.groupLetter != "") {
        if (change == "") {
          await functionsClasses.classPostData(obj);
          dispatch(postClass(obj));
          setClassesGroup("");
          setClassesNumber("");
          getClasses();
          setChange("");
          toast.success("Class created successfully");
        } else {
          try {
            await functionsClasses.changeClassName(changeId, obj);
            getClasses();
            setClassesGroup("");
            setClassesNumber("");
            setChange("");
          } catch (error) {
            console.log("error change", error);
          }
        }
      } else toast.info("Iltimos barcha qatorlarni to'ldiring");
    } catch (error) {
      console.log(error);
      toast.error("Bunday sinf mavjud", error);
    }
  };

  const changeClass = async (data) => {
    setClassesGroup(data.groupLetter);
    setClassesNumber(data.grade);
    setChangeId(data.id);
    setChange(data);
    dispatch(showModal());
  };

  return (
    <div className={`${Container} py-2 overflow-scroll`}>
      <div
        className={`${styleTopBarUINoFlex} w-full min-h-20 flex items-center justify-end px-3 overflow-scroll`}
      >
        <div>
          <BUTTON
            buttonFunction={() => dispatch(showModal())}
            name={t("class_creation")}
            active
          />
        </div>
      </div>
      <div
        className={`${open ? "hidden" : "flex"
          } flex-1 items-start justify-start gap-3 flex-wrap py-3`}
      >
        {classesData?.length === 0 ? (
          <LOADER />
        ) : (
          classesData?.map((res, id) => {
            return (
              <ACTIVECLASSES
                removeItem={removeItem}
                changeClass={changeClass}
                key={id}
                res={res}
                size={res?.size}
                nameOfClass={res?.grade + res?.groupLetter}
                id={res?.id}
                slug={res?.id}
                active={res?.active}
              />
            );
          })
        )}
      </div>
      <Rodal
        height={200}
        visible={visible}
        onClose={() => dispatch(showModal())}
      >
        <div className="w-full h-full">
          <p className="text-xl border-b border-brGray leading-10 font-bold text-textBlack">
            {t("class_creation")}
          </p>
          <div className="flex flex-col items-start justify-between h-28">
            <div className="flex items-center justify-between w-full gap-3">
              <SELECTCLASSNUMBERS
                classesNumber={classesNumber}
                setClassesNumber={setClassesNumber}
              />
              <SELECTCLASSGROUP
                classesGroup={classesGroup}
                setClassesGroup={setClassesGroup}
              />
            </div>
            <BUTTON
              name={t("save")}
              active
              buttonFunction={() => {
                postClasses();
                dispatch(showModal());
              }}
            />
          </div>
        </div>
      </Rodal>
      
    </div>
  );
}

export default ListOfClasses;
