import React from "react";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { BUTTON, CREATESCHEDULECLASSES } from "../ui";

function ClassScheduleID() {
  return (
    <div className={Container}>
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
        className={`${styleTopBarUINoFlex} min-h-96 flex items-center justify-center flex-wrap overflow-scroll`}>
          <CREATESCHEDULECLASSES />
          <CREATESCHEDULECLASSES weekday="Seshanba" active/>
          <CREATESCHEDULECLASSES weekday="Seshanba" active/>
          <CREATESCHEDULECLASSES weekday="Seshanba" active/>
          <CREATESCHEDULECLASSES weekday="Seshanba" active/>
          <CREATESCHEDULECLASSES weekday="Seshanba" active/>
        </div>
    </div>
  );
}

export default ClassScheduleID;
