import { Container, styleTopBarUINoFlex } from "../constanta/style"
import { EDIT, ICONIMG, userIcon } from "../icons"
import { BUTTONEXIT } from "../ui"

function Profil() {
    return (
        <div className={`${Container}flex flex-col items-center justify-center`}>
            <div className={`flex items-center justify-start flex-col gap-1 w-[300px]`}>
                <div className={`${styleTopBarUINoFlex} flex items-center flex-col justify-start gap-3 px-3 py-4`}>
                    <img className="rounded-lg" width={220} height={220} src={userIcon} alt="" />
                    <button className="flex items-center justify-center w-full gap-1 border border-brGray py-2 rounded-lg bg-lightGray"><img src={ICONIMG} alt="" />Tahrirlash</button>
                </div>
                <div className="bg-white py-2 px-3 w-full">
                    <BUTTONEXIT />
                </div>
            </div>
            <div>
                <div className={`min-h-96 flex flex-col  items-start justify-start ${styleTopBarUINoFlex} p-3 overflow-scroll`}>
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