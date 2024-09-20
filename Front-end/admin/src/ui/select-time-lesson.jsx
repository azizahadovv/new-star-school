import * as React from "react";
import lesson_times from "../service/archive-lesson-times";
import { useTranslation } from "react-i18next";

function SelectTimeLesson({ value, setValue, disible }) {
  const [data, setData] = React.useState([]);
  const { t } = useTranslation();
  React.useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const datas = await lesson_times.getTimes();
    setData(datas);
  };

  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      disabled={disible}
      className="form-select"
    >
      {data?.length === 0 ? (
        <option value="">{t("no_date")}</option>
      ) : (
        data?.map((item) => {
          return (
            <option key={item?.id} value={item?.id}>
              {item?.number}-{t("hour")}
            </option>
          );
        })
      )}
    </select>
  );
}

export default SelectTimeLesson;
