import React, { useEffect, useState } from "react";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { ICONIMG } from "../icons";
import student_Page_Function from "../service/student";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function StudentProfile() {
  const { t } = useTranslation();
  const [dataStudent, setDataStudent] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    get_datas_Student();
  }, []);

  const get_datas_Student = async () => {
    try {
      const response = await student_Page_Function.get_student_in_Id(id);
      setDataStudent(response);
    } catch (error) {
      navigate(-2);
      console.log(error);
    }
  };

  const saveImage = async (e) => {
    if (!e.name.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
      toast.error("File extension should be jpg, jpeg, png, gif, svg");
      return;
    }
    const formData = new FormData();
    formData.append("file", e);
    try {
      await student_Page_Function.uploadFile(id, formData);
      console.log("Uploaded file");
      get_datas_Student();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`${Container} flex tablet:items-start minMobil:items-center tablet:justify-start minMobil:justify-center gap-3 flex-wrap`}
    >
      <div
        className={`${styleTopBarUINoFlex} w-[300px] h-[380px] p-3 rounded-3xl flex items-center justify-between flex-col`}
      >
        <div className="w-full h-[80%] flex items-center justify-center rounded-xl overflow-hidden cursor-pointer">
          {dataStudent?.imageUrl === null ? (
            <div className="w-40 h-40 flex items-center justify-center rounded-full overflow-hidden bg-blue uppercase">
              <label className="text-6xl text-white flex items-center justify-center">
                {dataStudent?.firstName.charAt(0) +
                  "." +
                  dataStudent?.lastName.charAt(0)}
              </label>
            </div>
          ) : (
            <img className="rounded-full w-full h-full" src={dataStudent?.imageUrl} alt="dataStudent.image" />
          )}
        </div>
        <label
          className={`py-[10px] px-3 w-full ${"bg-lightGray text-textBlack"} border border-brGray rounded-xl mt-2 flex items-center justify-center gap-2 cursor-pointer`}
        >
          <input
            onChange={(e) => saveImage(e.target.files[0])}
            hidden
            type="file"
          />
          <span className="flex items-center justify-center gap-2">
            <img src={ICONIMG} alt="ICONIMG" />
            {t("edit")}
          </span>
        </label>
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
              <td className="w-50">{dataStudent?.firstName}</td>
            </tr>
            <tr>
              <th className="w-50">{t("lastName")}:</th>
              <td className="w-50">{dataStudent?.lastName}</td>
            </tr>
            <tr>
              <th className="w-50">{t("patronymic")}:</th>
              <td className="w-50">{dataStudent?.patronymic}</td>
            </tr>
            <tr>
              <th className="w-50">{t("birthday")}:</th>
              <td className="w-50">{dataStudent?.birthDate}</td>
            </tr>
            <tr>
              <th className="w-50">{t("gender")}:</th>
              <td className="w-50">{dataStudent?.gender}</td>
            </tr>
            <tr>
              <th className="w-50">{t("nation")}:</th>
              <td className="w-50">{dataStudent?.nationality}</td>
            </tr>
            <tr>
              <th className="w-50">{t("state")}:</th>
              <td className="w-50">{dataStudent?.country}</td>
            </tr>
            <tr>
              <th className="w-50">{t("province")}:</th>
              <td className="w-50">{dataStudent?.region}</td>
            </tr>
            <tr>
              <th className="w-50">{t("district")}:</th>
              <td className="w-50">{dataStudent?.district}</td>
            </tr>
            <tr>
              <th className="w-50">{t("home_address")}:</th>
              <td className="w-50">{dataStudent?.address}</td>
            </tr>
            <tr>
              <th className="w-50">{t("table_classes")}:</th>
              <td className="w-50">{dataStudent?.grade}</td>
            </tr>
            <tr>
              <th className="w-50">{t("phone_number")}:</th>
              <td className="w-50">{dataStudent?.phoneNumber}</td>
            </tr>
            <tr>
              <th className="w-50">{t("additional_phone_number")}:</th>
              <td className="w-50">{dataStudent?.parentPhoneNumber}</td>
            </tr>
            <tr>
              <th className="w-50">{t("login")}:</th>
              <td className="w-50">{dataStudent?.login}</td>
            </tr>
            <tr>
              <th className="w-50">{t("password")}:</th>
              <td className="w-50">{dataStudent?.password}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentProfile;
