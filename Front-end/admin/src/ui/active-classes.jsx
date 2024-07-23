import React from "react";
import { COACH, editBlue, menuDots, trash } from "../icons";
import { Link } from "react-router-dom";
import { setLocalData } from "../service/local-data";
function ActiveClasses({ nameOfClass, size, slug, id, removeItem, res, changeClass }) {
  return (
    <div className="no-underline tabletIst:w-[320px] minMobil:w-full mobil:w-[280px] h-20 border-card rounded-lg px-3 py-1 flex flex-col items-start justify-between gap-1 grow-effect relative -z-1">
      <div className="flex justify-between w-full">
        <Link
          to={slug.toString()}
          onClick={() => setLocalData("ClassId", id)}
          className="uppercase no-underline w-full flex justify-between items-start px-1 text-blue"
        >
          {nameOfClass}
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
            <button onClick={() => changeClass(res)} className="dropdown-item d-flex align-items-start border-brGray">
              <img src={editBlue} width={18} alt="editBlue" />
              Tahrirlash
            </button>
            <button
              onClick={() => removeItem(id)}
              className="dropdown-item d-flex align-items-start"
            >
              <img src={trash} width={20} alt="trash" />
              O‘chirish
            </button>
          </ul>
        </div>
      </div>
      <Link
        to={slug}
        className="text-textGray font-mono lowercase flex items-start justify-start mt-2 gap-2 text-lg no-underline w-full"
      >
        <img src={COACH} alt="COACH" /> {size}ta o‘quvchi
      </Link>
      <div className={"dropdown-menu dropdown-menu-dark"}></div>
    </div>
  );
}

export default ActiveClasses;
