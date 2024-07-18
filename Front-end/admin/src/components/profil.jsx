import { useSelector } from "react-redux"
import { Container, styleTopBarUINoFlex } from "../constanta/style"
import { EDIT, ICONIMG, userIcon } from "../icons"
import { BUTTONEXIT } from "../ui"

function Profil() {
    const open = useSelector(sel => sel.sidebarReduser.open)
    return (
        <div className={`${Container} flex items-start justify-center tablet:flex-row minMobil:flex-col ${open ? 'hidden' : 'flex'}`}>
            <div className={`minMobil:w-full flex items-center justify-start flex-col gap-1 tablet:w-[310px] px-2 `}>
                <div className={`${styleTopBarUINoFlex} flex items-center flex-col justify-start gap-3 px-3 py-4`}>
                    <img className="rounded-lg" width={220} height={220} src={userIcon} alt="" />
                    <button className="flex items-center justify-center w-full gap-1 border border-brGray py-2 rounded-lg bg-lightGray"><img src={ICONIMG} alt="" />Tahrirlash</button>
                </div>
                <div className="p-1 tablet:w-full minMobil:w-[310px] ">
                    <BUTTONEXIT />
                </div>
            </div>
            <div className="minMobil:w-full min-h-max tablet:max-w-full">
                <div className={`flex flex-col min-h-96  items-start justify-start ${styleTopBarUINoFlex} p-3 overflow-scroll`}>
                    <h2 className="text-blue font-bold">Shaxsiy ma’lumotlar</h2>
                    <table className="table table-hover cursor-pointer">
                        <tbody>
                            <tr>
                                <th>Ismi:</th>
                                <td>To‘lqin</td>
                            </tr>
                            <tr>
                                <th>Familiya:</th>
                                <td>Ziyodullayev</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="bg-blue px-4 py-2 text-white rounded-lg flex items-center justify-center gap-2 font-semibold"> <img width={15} height={15} src={EDIT} alt="EDIT" />Tahrirlash</button>
                </div>
            </div>
        </div>
    )
}

export default Profil