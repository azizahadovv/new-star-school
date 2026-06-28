import { teacherIcon } from "../icons";

// Dars jadvali kun-kartochkasi — Figma dizayni (dars-jadvali.png).
function CardClassSchedule({ weekDay, data }) {
  return (
    <div className="w-[430px] minMobil:w-full mobil:w-[340px] tablet:w-[400px] min-h-96 bg-white rounded-xl border border-[#E1EAF1] border-t-[3px] border-t-[#125DAC] shadow-[0_2px_8px_rgba(38,48,57,.05)] px-4 py-1">
      <div className="flex items-center justify-between py-3 border-b border-[#E1EAF1]">
        <p className="uppercase text-[#125DAC] text-[15px] font-bold m-0">{weekDay}</p>
      </div>

      <div className="divide-y divide-[#EEF3F7]">
        {data.map((item) => (
          <div key={item?.id} className="flex flex-col items-start justify-start py-3 gap-1">
            <div className="w-full flex items-start justify-between gap-2">
              <span className="text-[#263039] font-semibold text-[15px]">{item?.subjectName}</span>
              <span className="text-[#81909F] text-sm whitespace-nowrap">
                {item?.startTime?.slice(0, 5)}–{item?.endTime?.slice(0, 5)}
              </span>
            </div>
            <span className="flex items-center justify-start gap-2 text-[#81909F] text-sm capitalize">
              <img className="w-4 h-4 opacity-80" src={teacherIcon} alt="" />
              {item?.teacherName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardClassSchedule;
