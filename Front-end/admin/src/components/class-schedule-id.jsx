import React, { useEffect, useState } from "react";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { BUTTON, CREATESCHEDULECLASSES, LESSONTABLECARD, LOADER } from "../ui";
import { useSelector } from "react-redux";
import TimeTable from "../service/time-table";
import { useParams } from "react-router-dom";
import Rodal from 'rodal';
// include styles
import 'rodal/lib/rodal.css';
import teacherController from "../service/teacher";
function ClassScheduleID() {
  const [schedule, setSchedule] = useState([]);
  const [visible, setvisible] = useState(false);
  const [dayOfWeekRodal, setdayOfWeekRodal] = useState("");

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
        {
          schedule.length == 0 ? <div>
            <LOADER />
          </div> : <div className="w-full flex items-center justify-between flex-wrap">
            {
              schedule.map((res) => {
                return <div className="w-[450px] min-h-96 border-t-4-color border-blue">
                  <div>
                    <div className="w-full h-14 flex items-center justify-center border-b-2 border-brGray">
                      <span className="text-center text-blue uppercase">{res?.dayOfWeek}</span>
                    </div>
                    {
                      res?.schedule?.map((item, id) => {
                        return <>
                          <LESSONTABLECARD key={id} item={item} />
                        </>
                      })
                    }
                    <button onClick={() => {
                      setvisible(!visible)
                      setdayOfWeekRodal(res?.dayOfWeek)
                    }} className="w-full h-14 flex py-1 items-center justify-center  bg-border-color px-2 bg-lightGray text-textGray">+</button>
                  </div>
                </div>
              })
            }
          </div>
        }
      </div>
      <Rodal visible={visible} onClose={() => setvisible(!visible)}>
        <div>{dayOfWeekRodal}</div>
        <hr />
        <div className="w-full  flex flex-col items-start justify-evenly ">
          <button className="tablet:w-1/2 minMobil:w-full h-10 rounded-xl text-white bg-green">Saqlash</button>
        </div>
      </Rodal>
    </div>
  );
}

export default ClassScheduleID;
