import { styleTopBarUI, styleTopBarUINoFlex } from "../constanta/style"
import { ButtonFrameSection, CARDSCHEDULE } from "../ui"

function ClassSchedule() {
    return (
        <div className="w-full h-screen tablet:px-10 minMobil:px-1 ">
            <div className={`px-4 w-full min-h-16 ${styleTopBarUI}`}>
                <ButtonFrameSection nameBtn={"1-chorak"} active={true} />
                <ButtonFrameSection nameBtn={"2-chorak"} />
                <ButtonFrameSection nameBtn={"3-chorak"} />
                <ButtonFrameSection nameBtn={"4-chorak"} />
            </div>
            <div className={`${styleTopBarUINoFlex} w-full min-h-96 flex items-center justify-between flex-wrap gap-3 p-3 `}>
                <CARDSCHEDULE />
                <CARDSCHEDULE />
                <CARDSCHEDULE />
            </div>
        </div>
    )
}

export default ClassSchedule