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
  const { t } = useTranslation();
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
  const [updateId, setUpdateId] = useState("");
  const open = useSelector((sel) => sel.sidebarReduser.open);

  useEffect(() => {
    getScheduleClasses();
  }, [id]); // id o'zgarganda qayta ishlaydi

  // Ma'lumotlarni tozalovchi funksiya
  function nullUsestate() {
    setEndTime("");
    setStartTime("");
    setSubjectId("");
    setTeacherId("");
    setTermId(1);
    setTeacherData([]);
  }

  // Jadval ma'lumotlarini olish funksiyasi
  const getScheduleClasses = async () => {
    try {
      const response = await TimeTable.getTimeTableInId(id);
      setSchedule(response);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  // Formani to'ldirishni tekshiruvchi funksiya
  const isFormValid = () => {
    return endTime && startTime && subjectId && teacherId && termId;
  };

  // Jadval qo'shish va yangilash funksiyasi
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
      if (!isFormValid()) {
        toast.info("Fill in all the lines");
        return;
      }

      if (updateId === "") {
        await TimeTable.addTimeTable(data);
        toast.success("Added successfully");
      } else {
        await TimeTable.updateTimeTable(updateId, data);
        toast.success("Updated successfully");
      }
      getScheduleClasses();
      nullUsestate();
      closeModal();
    } catch (error) {
      console.error("Error adding/updating schedule:", error);
      toast.error("Error adding/updating schedule: " + error.message);
    }
  };

  // Ma'lumotlarni o'chirish funksiyasi
  const Trash_Data = async (item) => {
    if (!window.confirm("Delete the data?")) return;

    try {
      await TimeTable.TrashData(item.id);
      toast.success("Deleted successfully");
      getScheduleClasses(); // O'chirgandan so'ng yangilash
    } catch (error) {
      console.error("Error deleting schedule:", error);
      toast.error("Error deleting schedule: " + error.message);
    }
  };

  // Jadvalni yangilash funksiyasi
  const updateSchedule = (item) => {
    setvisible(true);
    setUpdateId(item.id);
    setdayOfWeekRodal(item.dayOfWeek);
    setEndTime(item.endTime);
    setStartTime(item.startTime);
    setTeacherId(item.teacherId);
    setTermId(item.termId);
  };

  // Modalni yopuvchi funksiya va holatlarni tozalash
  const closeModal = () => {
    setvisible(false);
    nullUsestate();
    setUpdateId("");
  };

  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUINoFlex} min-h-20 flex items-center justify-center`}>
        <b className="text-center font-bold leading-6 text-4xl text-textBlack">
          {t("class_schedule_home")}
        </b>
      </div>
      <div className={`${styleTopBarUINoFlex} ${open ? "hidden" : "flex"} min-h-96 flex items-center justify-center flex-wrap`}>
        {schedule?.length === 0 ? (
          <LOADER />
        ) : (
          <div className="w-full flex items-stretch justify-evenly py-5 gap-5 flex-wrap">
            {schedule?.map((res, id) => (
              <div key={id} className="w-[550px] min-h-96 border-t-4-color rounded-sm border-blue">
                <div>
                  <div className="w-full h-14 flex items-center justify-center border-b-2 border-brGray">
                    <span className="text-center text-blue uppercase">
                      {res?.dayOfWeek}
                    </span>
                  </div>
                  {res?.schedule?.map((item, id) => (
                    <LESSONTABLECARD key={id} functionEdit={updateSchedule} functionDelete={Trash_Data} item={item} />
                  ))}
                  <div className="p-1">
                    <button
                      onClick={() => {
                        setvisible(!visible);
                        setdayOfWeekRodal(res?.dayOfWeek);
                      }}
                      className="w-full h-14 flex py-1 items-center justify-center bg-border-color px-2 bg-lightGray text-textGray"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Rodal height={440} visible={visible} onClose={closeModal}>
        <div>{dayOfWeekRodal}</div>
        <hr />
        <div className="flex flex-col items-stretch justify-center gap-3">
          <TERM selectedOption={termId} setSelectedOption={setTermId} />
          <div className="flex items-center gap-3 justify-between">
            <div className="w-1/2">
              <INPUT value={startTime} setValue={setStartTime} typeINP="time" titleInp="Start" width="100%" />
            </div>
            <div className="w-1/2">
              <INPUT value={endTime} setValue={setEndTime} typeINP="time" titleInp="End" width="100%" />
            </div>
          </div>
          <SUBJECTINID setTeacherData={setTeacherData} value={subjectId} setValue={setSubjectId} />
          <SELECTTEACHER value={teacherId} setValue={setTeacherId} teacherData={teacherData} />
        </div>
        <div className="w-full my-3 flex flex-col items-start justify-evenly">
          <button onClick={addSchedule} className="minMobil:w-full h-14 rounded-xl text-white bg-green">
            {t("save")}
          </button>
        </div>
      </Rodal>
      <ToastContainer />
    </div>
  );
}

export default ClassScheduleID;
