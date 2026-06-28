import React, { useEffect, useState } from "react";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { BUTTON } from "../ui";
import { ICONIMG } from "../icons";
// import teacherController from '../service/teacher'
import { useNavigate, useParams } from "react-router-dom";
import teacherControllers from "../service/teacher";
import { useTranslation } from "react-i18next";

function TeacherProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dataTeacher, setDataTeacher] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    get_datas_Student();
  }, []);

  const get_datas_Student = async () => {
    const ids = localStorage.getItem("TeacherId");
    try {
      if (id === ids) {
        const response = await teacherControllers.getDataTeacherInId(id);
        setDataTeacher(response);
        console.log(response);
      } else {
        navigate(-2);
      }
    } catch (error) {
      console.log(error);
      navigate(-2);
    }
  };

  return (
    <div
      key={dataTeacher?.id}
      className={`${Container} flex tablet:items-start minMobil:items-center tablet:justify-start minMobil:justify-center gap-3 flex-wrap`}
    >
      <div
        className={`${styleTopBarUINoFlex} w-[300px] h-[380px] p-3 rounded-3xl flex items-center justify-between flex-col`}
      >
        <div className="w-full h-full flex items-center justify-center rounded-xl overflow-hidden cursor-pointer">
          {dataTeacher?.image === null || dataTeacher?.image === "" ? (
            <div className="w-40 h-40 flex items-center justify-center rounded-full overflow-hidden bg-blue uppercase">
              <span className="text-6xl text-white flex items-center justify-center">
                {dataTeacher?.firstName.charAt(0) +
                  "." +
                  dataTeacher?.lastName.charAt(0)}
              </span>
            </div>
          ) : (
            <img src={dataTeacher?.image} alt="" />
          )}
        </div>
      </div>
      <div
        className={`${styleTopBarUINoFlex} tablet:w-3/4 minMobil:w-full min-h-20 px-3 py-2`}
      >
        <div className="flex items-center justify-start min-h-16 border-b border-brGray mb-3">
          <h3 className="text-blue font-bold">{t("personal_information")}</h3>
        </div>
        <table className="table table-striped table-hover">
          <tbody>
            <tr>
              <th className="w-50">{t("firstName")}:</th>
              <th className="w-50">{dataTeacher?.firstName}</th>
            </tr>
            <tr>
              <th className="w-50">{t("lastName")}:</th>
              <th className="w-50">{dataTeacher?.lastName}</th>
            </tr>
            <tr>
              <th className="w-50">{t("patronymic")}:</th>
              <th className="w-50">{dataTeacher?.patronymic}</th>
            </tr>
            <tr>
              <th className="w-50">{t("birthday")}:</th>
              <th className="w-50">{dataTeacher?.birthDate}</th>
            </tr>
            <tr>
              <th className="w-50">{t("gender")}:</th>
              <th className="w-50">{dataTeacher?.gender}</th>
            </tr>
            <tr>
              <th className="w-50">{t("nation")}:</th>
              <th className="w-50">{dataTeacher?.nationality}</th>
            </tr>
            <tr>
              <th className="w-50">{t("state")}:</th>
              <th className="w-50">{dataTeacher?.country}</th>
            </tr>
            <tr>
              <th className="w-50">{t("province")}:</th>
              <th className="w-50">{dataTeacher?.region}</th>
            </tr>
            <tr>
              <th className="w-50">{t("district")}:</th>
              <th className="w-50">{dataTeacher?.district}</th>
            </tr>
            <tr>
              <th className="w-50">{t("home_address")}:</th>
              <th className="w-50">{dataTeacher?.address}</th>
            </tr>
            <tr>
              <th className="w-50">{t("phone_number")}:</th>
              <th className="w-50">{dataTeacher?.phoneNumber}</th>
            </tr>
            <tr>
              <th className="w-50">{t("science_teacher")}:</th>
              <th className="w-50">
                {dataTeacher?.subject?.map((ites) => {
                  return <span key={ites.id}>{ites?.name}</span>;
                })}
              </th>
            </tr>
            <tr>
              <th className="w-50">{t("login")}:</th>
              <th className="w-50">{dataTeacher?.login}</th>
            </tr>
            <tr>
              <th className="w-50">{t("password")}:</th>
              <th className="w-50">{dataTeacher?.password}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeacherProfile;
