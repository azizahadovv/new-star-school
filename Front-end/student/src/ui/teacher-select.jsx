import React from "react";
import { useTranslation } from "react-i18next";


function TeacherSelect({ value, setValue, teacherData }) {
    const path = window.location.pathname
    const { t } = useTranslation()

    console.log(path);
    return (
        <select
            required={true}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            style={{ height: "35px" }}
            className="form-select"
        >
            <option hidden>{t("hidden_teacher")}</option>
            {teacherData?.length === 0 ? (
                <option hidden={path === '/atendance' ? true : false}>{t("all")}</option>
            ) : (
                teacherData?.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.firstName} {item.lastName}
                    </option>
                ))
            )}
        </select>
    );
}

export default TeacherSelect;