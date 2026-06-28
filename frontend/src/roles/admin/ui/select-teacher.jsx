import React from "react";
import { useTranslation } from "react-i18next";

function SelectTeacher({ value, setValue, teacherData }) {
 const {t}=useTranslation()
  return (
    <select
      required={true}
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      style={{ height: "50px" }}
      className="form-select"
    >
      <option hidden>{t("select_teacher")}</option>
      {teacherData?.length === 0 ? (
        <option>{t("hidden_teacher")}</option>
      ) : (
        teacherData?.map((item) => (
          <option key={item?.id} value={item.id}>
            {item?.firstName} {item?.lastName}
          </option>
        ))
      )}
    </select>
  );
}

export default SelectTeacher;
