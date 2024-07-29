import { GreenIconStudent, editBlue, menuDots, trash } from "../icons";
import React, { useEffect, useState } from 'react';
import Rodal from 'rodal';
// include styles
import 'rodal/lib/rodal.css';
import teacherController from "../service/teacher";

function LessonTimeCard({ weekday, active, visible, setvisible }) {




    return (
        <>
            <div className="w-full h-16 border-b-2 p-1 border-brGray m-0 flex items-center justify-start">
                <div className="w-14 h-full border bg-lightGray rotate-90-a flex items-center justify-center p-3 py-[1px]">
                    <span className="text-nowrap text-sm text-textBlack">08:00</span>
                </div>

                {!active ? (
                    <div className="w-full h-14 flex py-1 items-center justify-center px-2 border bg-lightGray">
                        <div className="w-full flex flex-col  h-full m-0 items-start justify-between">
                            <span className="w-full font-bold">Chet tili</span>
                            <div className="flex items-center justify-start gap-2">
                                <img src={GreenIconStudent} alt="" />
                                <span className="text-textGray">Samandar Alishov</span>
                            </div>
                        </div>
                        <div className="dropdown">
                            <button
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src={menuDots}
                                    width={25}
                                    className=" p-1"
                                    alt="menuDots"
                                />
                            </button>
                            <div className={`dropdown-menu`}>
                                <button className="dropdown-item d-flex align-items-center gap-2">
                                    <img src={editBlue} width={20} alt="trash" />
                                    Tahrirlash
                                </button>
                                <button className="dropdown-item d-flex align-items-center gap-2">
                                    <img src={trash} width={20} alt="trash" />
                                    O‘chirish
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => (setvisible(!visible))} className="w-full h-14 flex py-1 items-center justify-center  bg-border-color px-2 bg-lightGray text-textGray">+</button>
                )}
                <div className="w-14 h-full border bg-lightGray rotate-90-a flex items-center justify-center p-3 py-[1px]">
                    <span className="text-nowrap text-sm text-textBlack">08:00</span>
                </div>
                <Rodal visible={visible} onClose={() => setvisible(!visible)}>
                    <div>{weekday}</div>
                    <hr />
                    <div className="w-full h-[75%] flex flex-col items-start justify-evenly ">
                        <button className="tablet:w-1/2 minMobil:w-full h-10 rounded-xl text-white bg-green">Saqlash</button>
                    </div>
                </Rodal>
            </div>

        </>
    )
}

export default LessonTimeCard