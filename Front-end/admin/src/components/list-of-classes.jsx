import { useDispatch, useSelector } from "react-redux";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import {
  ACTIVECLASSES,
  BUTTON,
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

  const visible = useSelector((sel) => sel.addclass.visible);
  const getclassData = useSelector((sel) => sel.addclass.class);
  const postClassdata = useSelector((sel) => sel.addclass.classesData);

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    try {
      const classesData = await functionsClasses.getClasses()
      dispatch(setClasses(classesData));
    } catch (error) {
      console.log(error);
    }
  };
console.log(postClassdata);
  const postClasses = async () => {
    try {
      const datta = await functionsClasses.classPostData(postClassdata)
      toast.success("Class yaratildi");
      getClasses()
    } catch (error) {
      toast.error("Bunday sinf mavjud",error);
    }
  };

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
        className={`${
          open ? "hidden" : "flex"
        } flex-1 items-start justify-start gap-3 flex-wrap py-3`}
      >
        {getclassData.map((res, id) => {
          return (
            <ACTIVECLASSES
              key={res.id}
              size={res.size}
              nameOfClass={res.name}
              id={id + 1}
              slug={res.id}
            />
          );
        })}
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
              <SELECTCLASSNUMBER setClassesNumber={setClassesNumber} />
              <SELECTCLASSGROUP setClassesGroup={setClassesGroup} />
            </div>
            <BUTTON
              name={"Saqlash"}
              active
              buttonFunction={() => {
                dispatch(
                  postClass({name:`${classesNumber+" "+classesGroup}-sinf`, grade: classesNumber, groupLetter: classesGroup })
                );
                dispatch(showModal());
                postClasses("")
                // toast.success("Sinf yaratildi!");
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
