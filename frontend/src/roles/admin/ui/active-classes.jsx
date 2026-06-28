import React from "react";
import { COACH, editBlue, menuDots, trash } from "../icons";
import { Link } from "react-router-dom";
import { setLocalData } from "../service/local-data";
import { useTranslation } from "react-i18next";
function ActiveClasses({ nameOfClass, size, slug, id, removeItem, res, changeClass }) {
  const { t } = useTranslation()
  return (
    <div className="no-underline tabletIst:w-[320px] minMobil:w-full mobil:w-[280px] bg-white rounded-xl border border-[#E1EAF1] border-t-[3px] border-t-[#125DAC] shadow-[0_2px_8px_rgba(38,48,57,.05)] hover:shadow-[0_8px_20px_rgba(38,48,57,.08)] transition-shadow px-4 py-3 flex flex-col items-start justify-between gap-1.5">
      <div className="flex justify-between w-full">
        <Link
          to={slug.toString()}
          onClick={() => setLocalData("ClassId", id)}
          className="uppercase no-underline w-full flex justify-between items-start font-bold text-[15px] text-[#125DAC]"
        >
          {nameOfClass} {t("table_classes")}
        </Link>
        <div>
          <button
            className="btn"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src={menuDots} width={25} className=" p-1" alt="menuDots" />
          </button>
          <ul className="dropdown-menu bg-light">
            <button onClick={() => changeClass(res)} className="dropdown-item d-flex align-items-start gap-2 border-brGray">
              <img src={editBlue} width={18} alt="editBlue" />
              {t("edit")}
            </button>
            <button
              onClick={() => removeItem(id)}
              className="dropdown-item d-flex align-items-start gap-2"
            >
              <img src={trash} width={20} alt="trash" />
              {t("delete")}
            </button>
          </ul>
        </div>
      </div>
      <Link
        to={slug}
        className="text-[#81909F] lowercase flex items-center justify-start gap-2 text-sm no-underline w-full"
      >
        <img src={COACH} alt="" className="w-5 h-5 opacity-70" /> {size} {t("number_of_students")}
      </Link>
      <div className={"dropdown-menu dropdown-menu-dark"}></div>
    </div>
  );
}

export default ActiveClasses;
