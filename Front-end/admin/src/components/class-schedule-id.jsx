import React, { useEffect, useState } from "react";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { BUTTON, CREATESCHEDULECLASSES } from "../ui";
import { useSelector } from "react-redux";
import TimeTable from "../service/time-table";
import { useParams } from "react-router-dom";

function ClassScheduleID() {
  const [schedule, setSchedule] = useState(null);
  const [visible, setvisible] = useState(false);
  const open = useSelector((sel) => sel.sidebarReduser.open);
  const { id } = useParams()

  useEffect(() => {
    getScheduleClasses();
  }, []);

  const getScheduleClasses = async () => {
    try {
      const response = await TimeTable.getTimeTableInId(id)
      setSchedule(response)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className={`${Container}`}>
      <div
        className={`${styleTopBarUINoFlex} min-h-20 flex items-center justify-center overflow-scroll`}
      >
        <div className="min-w-[140px]">
          <BUTTON active name={"1-chorak"} />
        </div>
        <div className="min-w-[140px]">
          <BUTTON name={"2-chorak"} />
        </div>
        <div className="min-w-[140px]">
          <BUTTON name={"3-chorak"} />
        </div>
        <div className="min-w-[140px]">
          <BUTTON name={"4-chorak"} />
        </div>
      </div>
      <div
        className={`${styleTopBarUINoFlex} ${open ? "hidden" : "flex"} min-h-96 flex items-center justify-center flex-wrap overflow-scroll`}>
        <CREATESCHEDULECLASSES weekday={"Dushanba"} data={schedule && schedule.MONDAY} />
        <CREATESCHEDULECLASSES weekday={"Seshanba"} data={schedule && schedule.TUESDAY} />
        <CREATESCHEDULECLASSES weekday={"Chorshanba"} data={schedule && schedule.WEDNESDAY} />
        <CREATESCHEDULECLASSES weekday={"Payshanba"} data={schedule && schedule.THURSDAY} />
        <CREATESCHEDULECLASSES weekday={"Juma"} data={schedule && schedule.FRIDAY} />
        <CREATESCHEDULECLASSES weekday={"Shanba"} data={schedule && schedule.SATURDAY} />
      </div>
    </div>
  );
}

export default ClassScheduleID;
