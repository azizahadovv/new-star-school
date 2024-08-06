import React, { useEffect, useState } from "react";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import {
  INPUT,
  LESSONTABLECARD,
  LOADER,
  SELECTTEACHER,
  SUBJECTINID,
  TERM,
} from "../ui";
import { useSelector } from "react-redux";
import TimeTable from "../service/time-table";
import { useParams } from "react-router-dom";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
function ClassScheduleID() {
  const {t}=useTranslation()
  const [schedule, setSchedule] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [visible, setvisible] = useState(false);
  const { id } = useParams();
  const [dayOfWeekRodal, setdayOfWeekRodal] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [subjectId, setSubjectId] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [termId, setTermId] = useState(1);
  const [updateId, setUpdateId] = useState('');
  const open = useSelector((sel) => sel.sidebarReduser.open);

  useEffect(() => {
    getScheduleClasses();
  }, []);


  function nullUsestate() {
    setEndTime("");
    setStartTime("");
    setSubjectId("");
    setTeacherId("");
    setTermId(1);
    setTeacherData([]);
  }

  const getScheduleClasses = async () => {
    try {
      const response = await TimeTable.getTimeTableInId(id);
      setSchedule(response);
    } catch (error) {
      console.log(error);
    }
  };

  const checked = endTime && startTime && subjectId && teacherId && termId;


  const addSchedule = async () => {
    const data = {
      classId: id,
      dayOfWeek: dayOfWeekRodal,
      endTime: endTime,
      startTime: startTime,
      subjectId: Number(subjectId),
      teacherId: Number(teacherId),
      termId: Number(termId),
    };
    try {
      if (checked) {
        if (updateId === "") {
          await TimeTable.addTimeTable(data).then((res) => {
            toast.success("Added successfully");
            getScheduleClasses();
            nullUsestate('');
            setvisible(false);
          });
        }else{
          await TimeTable.updateTimeTable(updateId, data).then((res) => {
            toast.success("Updated successfully");
            getScheduleClasses();
            setvisible(false);
            setUpdateId('');
            nullUsestate()
          });
        }
      } else {
        toast.info("Fill in all the lines");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, "Error adding schedule");
    }
  };

  const Trash_Data = async (item) => {
    const x = window.confirm("Delete the data?")
    try {
      if (x) {
        await TimeTable.TrashData(item.id);
        toast.success("Deleted successfully");
      } else {
        toast.info("Sizni xatolik qabul qilamiz")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, "Error deleting schedule");
    }
  };

  const updateSchedule = async (item) => {
    setvisible(true)
    setUpdateId(item.id);
    setdayOfWeekRodal(item.dayOfWeek)
    setEndTime(item.endTime);
    setStartTime(item.startTime);
    // setSubjectId();
    setTeacherId(item.teacherId);
    setTermId(item.termId);

  }


  return (
    <div className={`${Container}`}>
      <div
        className={`${styleTopBarUINoFlex} min-h-20 flex items-center justify-center overflow-scroll`}
      >
        <b className="text-center font-bold leading-6 text-4xl text-textBlack">
         {t("class_schedule_home")}
        </b>
      </div>
      <div
        className={`${styleTopBarUINoFlex} ${open ? "hidden" : "flex"
          } min-h-96 flex items-center justify-center flex-wrap overflow-scroll`}
      >
        {schedule.length == 0 ? (
          <div>
            <LOADER />
          </div>
        ) : (
          <div className="w-full flex items-stretch justify-evenly py-5 gap-5 flex-wrap">
            {schedule.map((res, id) => {
              return (
                <div
                  key={id}
                  className="w-[550px] min-h-96 border-t-4-color rounded-sm border-blue"
                >
                  <div>
                    <div className="w-full h-14 flex items-center justify-center border-b-2 border-brGray">
                      <span className="text-center text-blue uppercase">
                        {res?.dayOfWeek}
                      </span>
                    </div>
                    {res?.schedule?.map((item, id) => {
                      return (
                        <div key={id}>
                          <LESSONTABLECARD functionEdit={updateSchedule} functionDelete={Trash_Data} item={item} />
                        </div>
                      );
                    })}
                    <div className="p-1 ">
                      <button
                      onClick={() => {
                        setvisible(!visible);
                        setdayOfWeekRodal(res?.dayOfWeek);
                      }}
                      className="w-full h-14 flex py-1 items-center justify-center  bg-border-color px-2 bg-lightGray text-textGray"
                    >
                      +
                    </button>
                    </div>
                    
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Rodal
        height={440}
        visible={visible}
        onClose={() => setvisible(!visible)}
      >
        <div>{dayOfWeekRodal}</div>
        <hr />
        <div className="flex flex-col items-stretch justify-center gap-3">
          <TERM value={termId} setValue={setTermId} />
          <div className="flex items-center gap-3 justify-between">
            <div className="w-1/2">
              <INPUT
                value={startTime}
                setValue={setStartTime}
                typeINP={"time"}
                titleInp={"Start"}
                width={"100%"}
              />
            </div>
            <div className="w-1/2">
              <INPUT
                value={endTime}
                setValue={setEndTime}
                typeINP={"time"}
                titleInp={"End"}
                width={"100%"}
              />
            </div>
          </div>
          <SUBJECTINID
            setTeacherData={setTeacherData}
            value={subjectId}
            setValue={setSubjectId}
          />
          <SELECTTEACHER
            value={teacherId}
            setValue={setTeacherId}
            teacherData={teacherData}
          />
        </div>
        <div className="w-full my-3 flex flex-col items-start justify-evenly ">
          <button
            onClick={addSchedule}
            className="minMobil:w-full h-14 rounded-xl text-white bg-green"
          >
            Saqlash
          </button>
        </div>
      </Rodal>
      <ToastContainer />
    </div>
  );
}

export default ClassScheduleID;
