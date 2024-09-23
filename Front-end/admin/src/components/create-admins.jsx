import React, { useEffect, useState } from 'react'
import { Container, styleTopBarUINoFlex } from '../constanta/style'
import { BUTTON, RODAL } from '../ui'
import { useTranslation } from 'react-i18next';
import Admin_user from '../service/admin';
import { toast } from 'react-toastify';
function CreateAdmin() {
    const [modal, setModal] = React.useState(false);
    const [users, setUsers] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        getAllData()
    }, [])


    const getAllData = async () => {
        const data = await Admin_user.getAllAdminData()
        setUsers(data);
    }

    return (
        <div className={`${Container}`}>
            <div className={`${styleTopBarUINoFlex} min-h-20 overflow-scroll p-3 flex items-center tablet:justify-end minMobil:justify-center`}>
                <div>
                    <BUTTON buttonFunction={() => toast.info('information_create_admin')} name={t('create_admin')} active />
                </div>
            </div>
            <div className={`${styleTopBarUINoFlex} min-h-96 overflow-scroll p-3`}>
                {users.length === 0 ? (
                    <div className="flex items-center justify-center mt-5">
                        <h3 className="flex items-center justify-center">{t("no_date")}</h3>
                    </div>
                ) : (
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>
                                    <p className="min-w-40">№</p>
                                </th>
                                <th>
                                    <p className="min-w-40">
                                        {t("firstName")} {t("lastName")} {t("patronymic")}
                                    </p>
                                </th>
                                <th>
                                    <p className="min-w-28">{t("birthday")}</p>
                                </th>
                                <th>
                                    <p className="min-w-28">{t("phone_number")}</p>
                                </th>
                                <th>
                                    <p className="min-w-28">{t("science_teacher")}</p>
                                </th>
                                <th>
                                    <p className="min-w-28">{t("active_table")}</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((item, id) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{id + 1}</td>
                                        <td className='flex align-items-center juctify-content-center gap-2'>
                                            <img className='min-w-10 min-h-10 rounded-full overflow-hidden' width={40} src={item.imageUrl} />
                                            {item?.firstName} {item?.lastName} {item?.patronymic}
                                        </td>
                                        <td>{item?.birthDate}</td>
                                        <td>{item?.phoneNumber}</td>
                                        <td>{item?.gender === "Male" ? t("male") : t("female")}</td>
                                        <td className="font-bold">
                                            <span className="text-red">
                                                {item?.isActive ? t("info_warning") : t("info_danger")}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            <RODAL modal={modal} setModal={setModal} />
        </div>
    )
}

export default CreateAdmin