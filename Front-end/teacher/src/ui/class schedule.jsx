import { bgLightGray, bgLightGrayMark } from "../constanta/style"
import { userIcon } from "../icons"

function ClassSchedule() {

    const data = `${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}`
    return (
        <div className="w-full overflow-scroll">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>
                            <span scope="row">
                                O‘quvchilar
                            </span>
                        </th>
                        <th>
                            <input type="date" value={data} className={`${bgLightGray} border-t-blue no-underline outline-none`} />
                        </th>
                        <th>
                            <input type="date" value="2001-01-01" className={`${bgLightGray} border-t-blue no-underline outline-none`} />
                        </th> <th>
                            <input type="date" value="2001-01-01" className={`${bgLightGray} border-t-blue no-underline outline-none`} />
                        </th> <th>
                            <input type="date" value="2001-01-01" className={`${bgLightGray} border-t-blue no-underline outline-none`} />
                        </th> <th>
                            <input type="date" value="2001-01-01" className={`${bgLightGray} border-t-blue no-underline outline-none`} />
                        </th> <th>
                            <input type="date" value="2001-01-01" className={`${bgLightGray} border-t-blue no-underline outline-none`} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="w-25">
                            <div className="min-w-[250px] flex gap-2 items-center">
                                <img className="rounded-full w-[40px] h-[40px]" src={userIcon} alt="..." />
                                <span>Азиз Ахадов</span>
                            </div>
                        </td>
                        <td>
                            <input value={5} className={`${bgLightGrayMark} no-underline outline-none`} />
                        </td>
                        <td>
                            <input value={5} className={`${bgLightGrayMark} no-underline outline-none`} />
                        </td> <td>
                            <input value={5} className={`${bgLightGrayMark} no-underline outline-none`} />
                        </td> <td>
                            <input value={5} className={`${bgLightGrayMark} no-underline outline-none`} />
                        </td> <td>
                            <input value={5} className={`${bgLightGrayMark} no-underline outline-none`} />
                        </td> <td>
                            <input value={5} className={`${bgLightGrayMark} no-underline outline-none`} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ClassSchedule