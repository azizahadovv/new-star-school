import { GreenIconStudent, editBlue, menuDots, trash } from "../icons";
function LessonTimeCard({ weekday, active, visible, setvisible, item }) {
    return (
        <>
            <div className="w-full h-16 border-b-2 p-1 border-brGray m-0 flex items-center justify-start">
                <div className="w-14  h-full border bg-lightGray rotate-90-a flex items-center justify-center ">
                    <span className="text-nowrap text-sm text-textBlack">{item.startTime}</span>
                </div>
                
                    <div className="w-full h-14 flex py-1 items-center justify-center px-2 border bg-lightGray">
                        <div className="w-full flex flex-col  h-full m-0 items-start justify-between">
                            <span className="w-full font-bold">{item.subjectName}</span>
                            <div className="flex items-center justify-start gap-2">
                                <img src={GreenIconStudent} alt="" />
                                <span className="text-textGray">{item.teacherName}</span>
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
                <div className="w-14 h-full border bg-lightGray rotate-90-a flex items-center justify-center p-3 py-[1px]">
                    <span className="text-nowrap text-sm text-textBlack">{item.endTime}</span>
                </div>
            </div>
        </>
    )
}

export default LessonTimeCard