import React, { useState } from "react";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { BUTTON, CREATESCHEDULECLASSES } from "../ui";
import { useSelector } from "react-redux";

function ClassScheduleID() {
  const [visible, setvisible] = useState(false);
  const open = useSelector((sel) => sel.sidebarReduser.open);

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
        <CREATESCHEDULECLASSES />
        <CREATESCHEDULECLASSES weekday="Seshanba" active />
        <CREATESCHEDULECLASSES weekday="Chorshanba" active />
        <CREATESCHEDULECLASSES weekday="Payshanba" active />
        <CREATESCHEDULECLASSES weekday="Juma" active />
        <CREATESCHEDULECLASSES weekday="Shanba" active />
      </div>
    </div>
  );
}

export default ClassScheduleID;
