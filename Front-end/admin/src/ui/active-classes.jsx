import React from "react";
import { COACH, editBlue, menuDots, trash } from "../icons";
import { activeEdit } from "../constanta/style";
import { useDispatch, useSelector } from "react-redux";
import { showActiveModal } from "../slice/class";
import { Link } from "react-router-dom";

function ActiveClasses({ nameOfClass, size, slug, id }) {
  const visible = useSelector((sel) => sel.addclass.activeModal);
  const dispatch = useDispatch();

  return (
    <div className="no-underline tabletIst:w-[330px] minMobil:w-full mobil:w-[250px] h-20 border-card rounded-lg px-3 py-2 flex flex-col items-start justify-between gap-1 grow-effect relative -z-1">
      <div className="flex justify-between w-full">
        <Link
          to={slug.toString()}
          className="uppercase no-underline w-full flex justify-between items-start px-1 text-blue"
        >
          {nameOfClass}
        </Link>
        <button onClick={() => dispatch(showActiveModal())}>
          <img src={menuDots} width={25} className=" p-1" alt="menuDots" />
        </button>
      </div>
      <Link
        to={slug}
        className="text-textGray font-mono lowercase flex items-start justify-start mt-2 gap-2 text-lg no-underline  w-full"
      >
        <img src={COACH} alt="COACH" /> {size}ta o‘quvchi
      </Link>
      <div
        className={`${activeEdit} ${
          visible ? "block" : "hidden"
        } top-0 -right-28 z-10`}
      >
        <button className="flex items-stretch justify-center gap-2 border-b border-brGray">
          <img src={editBlue} width={18} alt="editBlue" />
          Tahrirlash
        </button>
        <button className="flex items-stretch justify-center gap-2">
          <img src={trash} width={20} alt="trash" />
          O‘chirish
        </button>
      </div>
    </div>
  );
}

export default ActiveClasses;
