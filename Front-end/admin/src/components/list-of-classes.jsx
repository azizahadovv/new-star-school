import { useDispatch, useSelector } from "react-redux";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import {
  ACTIVECLASSES,
  BUTTON,
  LOADER,
  SEARCH,
  SELECTCLASSGROUP,
  SELECTCLASSNUMBER,
} from "../ui";
import { postClass, setClasses, showModal } from "../slice/class";
import Rodal from "rodal";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import functionsClasses from "../service/function-class";

function ListOfClasses() {
  const dispatch = useDispatch();
  const open = useSelector((sel) => sel.sidebarReduser.open);
  const [classesNumber, setClassesNumber] = useState("");
  const [classesGroup, setClassesGroup] = useState("");
  const [change, setChange] = useState("")
  const [changeId, setChangeId] = useState('')
  const visible = useSelector((sel) => sel.addclass.visible);
  const getclassData = useSelector((sel) => sel.addclass.class);

  useEffect(() => {
    getClasses();
  }, []);

  const obj = {
    name: `${classesNumber + " " + classesGroup}-sinf`,
    grade: classesNumber,
    groupLetter: classesGroup,
  };
  const getClasses = async () => {
    try {
      const classesData = await functionsClasses.getClasses();
      dispatch(setClasses(classesData));
    } catch (error) {
      console.log(error);
    }
  };
  const removeItem = async (id) => {
    let question = prompt(
      "sinfga tegishli barcha ma'lumotlar o'chishini istasangiz 'YES' deb yozing,\n E'tibor bering sinfning barcha ma'lumotlar va o'quvchilari malumotlari o'chirib yuboriladi!"
    );
    try {
      if (question === "YES") {
        await functionsClasses.removeClass(id);
        toast.success("sinf o'chirildi");
      } else toast.error("malumotlar o'chirilmadi qayta urinib ko'ring");
      getClasses();
    } catch (error) { }
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
          setChange('')
          toast.success("sinf yaratildi");
        } else {
          try {
            await functionsClasses.changeClassName(changeId, obj)
            console.log("success", "change");
            getClasses();
            setClassesGroup("");
            setClassesNumber("");
            setChange('')

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
    setClassesGroup(data.groupLetter)
    setClassesNumber(data.grade)
    setChangeId(data.id)
    setChange(data)
    dispatch(showModal());
  }



  return (
    <div className={`${Container} py-2 overflow-scroll`}>
      <div
        className={`${styleTopBarUINoFlex} w-full min-h-20 flex items-center justify-between px-3 overflow-scroll`}
      >
        <div className="tablet:min-w-2/6 minMobil:min-w-[300px]">
          <SEARCH />
        </div>
        <div>
          <BUTTON
            buttonFunction={() => dispatch(showModal())}
            name={"Sinf yaratish"}
            active
          />
        </div>
      </div>
      <div
        className={`${open ? "hidden" : "flex"
          } flex-1 items-start justify-start gap-3 flex-wrap py-3`}
      >
        {!getclassData ? (
          <LOADER />
        ) : (
          getclassData.map((res, id) => {
            return (
              <ACTIVECLASSES
                removeItem={removeItem}
                changeClass={changeClass}
                key={id}
                res={res}
                size={res.size}
                nameOfClass={res.name}
                id={res.id}
                slug={res.id}
                active={res.active}
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
            Sinf yaratish
          </p>
          <div className="flex flex-col items-start justify-between h-28">
            <div className="flex items-center justify-between w-full gap-3">
              <SELECTCLASSNUMBER classesNumber={classesNumber} setClassesNumber={setClassesNumber} />
              <SELECTCLASSGROUP classesGroup={classesGroup} setClassesGroup={setClassesGroup} />
            </div>
            <BUTTON
              name={"Saqlash"}
              active
              buttonFunction={() => {
                postClasses();
                dispatch(showModal());
              }}
            />
          </div>
        </div>
      </Rodal>
      <ToastContainer />
    </div>
  );
}

export default ListOfClasses;
