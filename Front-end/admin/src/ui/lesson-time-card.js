import { useState } from "react";
import { GreenIconStudent, menuDots } from "../icons";
import React from 'react';
import Rodal from 'rodal';

// include styles
import 'rodal/lib/rodal.css';

function LessonTimeCard({ active, visible, setvisible }) {
    return (
        <>

            <div className="w-full h-16 border-b-2 p-1 border-brGray m-0 flex items-center justify-start">
                <div className="w-14 h-full border bg-lightGray rotate-90-a flex items-center justify-center p-3 py-[1px]">
                    <span className="text-nowrap text-sm text-textBlack">08:00</span>
                </div>
                {active ? (
                    <div className="w-full h-14 flex py-1 items-center justify-center px-2 border bg-lightGray">
                        <div className="w-full flex flex-col  h-full m-0 items-start justify-between">
                            <span className="w-full font-bold">Chet tili</span>
                            <div className="flex items-center justify-start gap-2">
                                <img src={GreenIconStudent} alt="" />
                                <span className="text-textGray">Samandar Alishov</span>
                            </div>
                        </div>
                        <button className="flex items-center justify-center p-1 ">
                            <img width={16} src={menuDots} alt="" />
                        </button>
                    </div>
                ) : (
                    <button onClick={() => (setvisible(!visible))} className="w-full h-14 flex py-1 items-center justify-center  bg-border-color px-2 bg-lightGray text-textGray">+</button>
                )}
                <Rodal visible={visible} onClose={() => setvisible(!visible)}>
                    <div>Content</div>
                </Rodal>
            </div>

        </>
    )
}

export default LessonTimeCard