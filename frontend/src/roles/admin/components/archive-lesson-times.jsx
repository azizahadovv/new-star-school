import * as React from "react";
import { Container, styleTopBarUINoFlex2 } from "../constanta/style";
import { ADDTIMELESSON, BUTTON, INPUT } from "../ui";
import { useTranslation } from "react-i18next";
import lesson_times from "../service/archive-lesson-times";
import { PLUSS, TRASHING, editBlue, menuDots } from "../icons";
import Rodal from "rodal";
import { toast } from "react-toastify";

function ArchiveLessonTime() {
  const [time, setTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [startTime, setStartTime] = React.useState("");

  const [modal, setModal] = React.useState(false);
  const [updateId, setUpdateId] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);
  const [datas, setDatas] = React.useState([]);
  const { t } = useTranslation();

  React.useEffect(() => {
    getDataInDb();
  }, [time]);

  const getDataInDb = async () => {
    const data = await lesson_times.getTimes();
    setDatas(data);
  };

  const removeTime = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this time?"
    );
    if (confirmed) {
      await lesson_times.delete(id);
      getDataInDb();
    } else {
      toast.info("Deletion canceled");
    }
  };

  const saveData = async () => {
    if (!time || !startTime || !endTime) {
      toast.error("Please fill all fields");
      return;
    }

    if (isEditing) {
      await lesson_times.updateData(updateId, {
        number: time,
        startTime,
        endTime,
      });
    } else {
      await lesson_times.saveTime({
        number: time,
        startTime,
        endTime,
      });
    }
    resetModal();
    getDataInDb();
  };

  const changeData = (item) => {
    setUpdateId(item.id);
    setTime(item.number);
    setStartTime(item.startTime);
    setEndTime(item.endTime);
    setIsEditing(true);
    setModal(true);
  };

  const resetModal = () => {
    setTime("");
    setStartTime("");
    setEndTime("");
    setIsEditing(false);
    setModal(false);
  };

  return (
    <div className={`${Container}`}>
      <div
        className={`${styleTopBarUINoFlex2} min-h-20 flex items-center justify-end px-3`}
      >
        <div>
          <BUTTON
            buttonFunction={() => {
              resetModal();
              setModal(true);
            }}
            img={PLUSS}
            active
          />
        </div>
      </div>
      <div className={`${styleTopBarUINoFlex2} min-h-96 p-3 overflow-scroll`}>
        {datas.length === 0 ? (
          <div className="flex items-center justify-center mt-5">
            <h2>{t("no_date")}</h2>
          </div>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>{t("№")}</th>
                <th>{t("Start")}</th>
                <th>{t("End")}</th>
                <th>{t("Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.number} - {t("hour")}
                  </td>
                  <td>{item.startTime}</td>
                  <td>{item.endTime}</td>
                  <td>
                    <div className="dropdown">
                      <button
                        className="btn btn-link"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src={menuDots}
                          width={23}
                          className="p-1"
                          alt="menuDots"
                        />
                      </button>
                      <div className="dropdown-menu">
                        <button
                          onClick={() => changeData(item)}
                          className="dropdown-item d-flex align-items-center gap-2"
                        >
                          <img src={editBlue} width={20} alt="edit" />
                          {t("edit")}
                        </button>
                        <button
                          onClick={() => removeTime(item.id)}
                          className="dropdown-item d-flex align-items-center gap-2"
                        >
                          <img src={TRASHING} width={20} alt="delete" />
                          {t("delete")}
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Rodal height={260} visible={modal} onClose={resetModal}>
        <div className="flex flex-col items-center gap-3">
          <b className="text-xl">
            {isEditing ? t("edit_lesson_time") : t("add_lesson_time")}
          </b>
          <ADDTIMELESSON value={time} setValue={setTime} />
          <div className="flex items-center justify-between w-full gap-2">
            <div className="w-1/2">
              <INPUT
                value={startTime}
                setValue={setStartTime}
                typeINP={"time"}
                titleInp={"Start"}
                width={"100%"}
              />
            </div>
            <div className="w-1/2">
              <INPUT
                value={endTime}
                setValue={setEndTime}
                typeINP={"time"}
                titleInp={"End"}
                width={"100%"}
              />
            </div>
          </div>
          <button onClick={saveData} className="btn btn-success w-full">
            {t("save")}
          </button>
        </div>
      </Rodal>
    </div>
  );
}

export default ArchiveLessonTime;
