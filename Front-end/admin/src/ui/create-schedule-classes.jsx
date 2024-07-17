import { GreenIconStudent, menuDots } from "../icons";

function CreateScheduleClasses({ weekday = "DUSHANBA" }) {
  return (
    <div className="w-[480px] min-h-96 border-t-4-color border-blue">
      <div className="w-full h-14 flex items-center justify-center border-b-2 border-brGray">
        <span className="text-center text-blue uppercase">{weekday}</span>
      </div>
      <div className="w-full h-12 border-b-2 py-1 border-brGray m-0 flex items-center justify-start">
        <div className="w-12 h-full border bg-lightGray rotate-90-a flex items-center justify-center p-3 py-[1px]">
          <span className="text-nowrap text-sm text-textBlack">08:00</span>
        </div>
        <div className="w-full h-12 flex flex-col items-start justify-center px-2 border bg-lightGray">
          <div className="w-full flex h-full m-0 items-start justify-between">
            <span className="w-full font-bold">Chet tili</span>
            <button className="flex items-center justify-center p-1 ">
              <img width={16} src={menuDots} alt="" />
            </button>
          </div>
          <div className="flex items-center justify-start gap-2">
            <img src={GreenIconStudent} alt="" />
            <span className="text-textGray">Samandar Alishov</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateScheduleClasses;
