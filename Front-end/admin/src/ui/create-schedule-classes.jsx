import { useState } from "react";
import { LESSONTABLECARD } from ".";

function CreateScheduleClasses({ data,weekday }) {
  const [visible1, setvisible1] = useState(false)
  console.log(data);
  return (
    <div className="w-[450px] min-h-96 border-t-4-color border-blue">

      <div className="w-full h-14 flex items-center justify-center border-b-2 border-brGray">
        <span className="text-center text-blue uppercase">{weekday}</span>
      </div>
      {
        data?.map((item) => {
          return <LESSONTABLECARD key={item.id} item={item} />
        })
      }
    </div>
  );
}

export default CreateScheduleClasses;
