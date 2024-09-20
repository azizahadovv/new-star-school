import React, { useEffect, useState } from "react";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import {
  LESSONTABLECARD,
  LOADER,
  SELECTTEACHER,
  SELECTTIME,
  SUBJECTINID,
  TERM,
} from "../ui";
import { useSelector } from "react-redux";
import TimeTable from "../service/time-table";
import { useParams } from "react-router-dom";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function ClassScheduleID() {
  const { t } = useTranslation();
  const [schedule, setSchedule] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [visible, setVisible] = useState(false);
  const { id } = useParams();
  const [dayOfWeekRodal, setDayOfWeekRodal] = useState("");
  const [time, setTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [termId, setTermId] = useState(1);
  const [updateId, setUpdateId] = useState("");
  const open = useSelector((sel) => sel?.sidebarReduser?.open ?? false);

  useEffect(() => {
    getScheduleClasses();
  }, []);

  function nullUsestate() {
    setTime("");
    setStartTime("");
    setSubjectId("");
    setTeacherId("");
    setTermId(1);
    setTeacherData([]);
  }

  const getScheduleClasses = async () => {
    try {
      const response = await TimeTable.getTimeTableInId(id);
      setSchedule(response ?? []);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const addSchedule = async () => {
    const isFormValid =
      time && subjectId !== null && teacherId !== null && termId;
    if (!isFormValid) {
      toast.info(t("Fill in all the lines"));
      return;
    }

    const data = {
      classId: id,
      dayOfWeek: dayOfWeekRodal,
      time,
      subjectId: Number(subjectId),
      teacherId: Number(teacherId),
      termId: Number(termId),
    };

    try {
      if (!updateId) {
        await TimeTable.addTimeTable(data);
      } else {
        await TimeTable.updateTimeTable(updateId, data);
        toast.success(t("Updated successfully"));
      }
      getScheduleClasses();
      setVisible(false);
      nullUsestate();
    } catch (error) {
      toast.error(t("Error adding schedule"));
    }
  };

  const Trash_Data = async (item) => {
    const confirmDelete = window.confirm(t("Archiving the data?"));
    if (!confirmDelete) return;

    try {
      await TimeTable.TrashData(item.id);
      toast.success(t("Deleted successfully"));
      getScheduleClasses();
    } catch (error) {
      console.error("Error archive schedule:", error);
      toast.error(t("Error archive schedule"));
    }
  };

  const updateSchedule = (item) => {
    setVisible(true);
    setUpdateId(item?.id ?? "");
    setTime(item?.endTime ?? "");
    setTeacherId(item?.teacherId ?? null);
    setTermId(item?.termId ?? 1);
  };

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
        className={`${styleTopBarUINoFlex} ${
          open ? "hidden" : "flex"
        } min-h-96 flex items-center justify-center flex-wrap overflow-scroll`}
      >
        {schedule?.length === 0 ? (
          <LOADER />
        ) : (
          <div className="w-full flex items-stretch justify-evenly py-5 gap-5 flex-wrap">
            {schedule?.map((res, id) => (
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
                  {res?.schedule?.map((item, id) => (
                    <div key={id}>
                      <LESSONTABLECARD
                        functionEdit={updateSchedule}
                        functionDelete={Trash_Data}
                        item={item}
                      />
                    </div>
                  ))}
                  <div className="p-1 ">
                    <button
                      onClick={() => {
                        setVisible(!visible);
                        setDayOfWeekRodal(res?.dayOfWeek ?? "");
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
      <Rodal
        height={380}
        visible={visible}
        onClose={() => setVisible(!visible)}
      >
        <div>{dayOfWeekRodal}</div>
        <hr />
        <div className="flex flex-col items-stretch justify-center gap-3">
          <TERM value={termId} setValue={setTermId} />
          <div className="flex items-center gap-3 justify-between">
            <SELECTTIME value={time || ""} setValue={setTime} />
          </div>
          <SUBJECTINID
            weekDay={dayOfWeekRodal}
            startTime={time}
            setTeacherData={setTeacherData}
            value={subjectId || ""}
            setValue={setSubjectId}
          />

          <SELECTTEACHER
            value={teacherId || ""}
            setValue={setTeacherId}
            teacherData={teacherData}
          />
        </div>
        <div className="w-full my-3 flex flex-col items-start justify-evenly ">
          <button
            onClick={addSchedule}
            className="minMobil:w-full h-14 rounded-xl text-white bg-green"
          >
            {t("save")}
          </button>
        </div>
      </Rodal>
    </div>
  );
}

export default ClassScheduleID;
