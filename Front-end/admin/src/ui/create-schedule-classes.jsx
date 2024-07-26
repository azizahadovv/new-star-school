import { useState } from "react";
import { LESSONTABLECARD } from ".";

function CreateScheduleClasses({ weekday = "DUSHANBA", active, visible, setvisible }) {

  return (
    <div className="w-[450px] min-h-96 border-t-4-color border-blue">
      <div className="w-full h-14 flex items-center justify-center border-b-2 border-brGray">
        <span className="text-center text-blue uppercase">{weekday}</span>
      </div>
      <LESSONTABLECARD />
      <LESSONTABLECARD />
      <LESSONTABLECARD />
      <LESSONTABLECARD />
      <LESSONTABLECARD />
      <LESSONTABLECARD />

    </div>
  );
}

export default CreateScheduleClasses;
