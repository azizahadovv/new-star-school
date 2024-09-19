import * as React from 'react'
import { Container, styleTopBarUINoFlex2 } from '../constanta/style'
import { BUTTON } from '../ui'
import { useTranslation } from 'react-i18next'
import lesson_times from '../service/archive-lesson-times'
import { TRASHING, editBlue, menuDots } from '../icons'
import Rodal from 'rodal'
import { toast } from 'react-toastify'

function ArchiveLessonTIme() {
    const [modal, setModal] = React.useState(false)
    const [datas, setDatas] = React.useState([])
    const { t } = useTranslation()

    React.useEffect(() => {
        getDataInDb() // fetch data from db and update state here if needed
    }, [])


    const getDataInDb = async () => {
        const data = await lesson_times.getTimes()
        setDatas(data);
    }

    const removeTime = async (ids) => {
        const chack = window.confirm('Are you sure you want to')
        if (chack) {
            console.log(ids);
            await lesson_times.delete(ids)
            getDataInDb()
        } else toast.info('Please try again')

    }

    return (
        <div className={`${Container}`}>
            <div className={`${styleTopBarUINoFlex2} min-h-20 flex items-center justify-end px-3`}>
                <div>
                    <BUTTON buttonFunction={() => setModal(true)} name={t('adddd')} active />
                </div>
            </div>
            <div className={`${styleTopBarUINoFlex2} min-h-96 p-3 overflow-scroll`}>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>{t("№")}</th>
                            <th>{t("Kirish")}</th>
                            <th>{t("Chiqish")}</th>
                            <th>{t("active_table")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datas?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.number + "-" + t('hour')}</td>
                                    <td>{item?.startTime}</td>
                                    <td>{item?.endTime}</td>
                                    <td>
                                        <button
                                            className="flex items-center justify-center"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <img
                                                src={menuDots}
                                                width={23}
                                                className=" p-1"
                                                alt="menuDots"
                                            />
                                        </button>
                                        <div className={`dropdown-menu`}>
                                            <button className="dropdown-item d-flex align-items-center gap-2">
                                                <img src={editBlue} width={20} alt="trash" />
                                                {t("edit")}
                                            </button>
                                            <button onClick={() => { removeTime(item.id) }} className="dropdown-item d-flex align-items-center gap-2">
                                                <img src={TRASHING} width={20} alt="trash" />
                                                {t("delete")}
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>

            <Rodal
                height={200}
                visible={modal}
                onClose={() => setModal(!modal)}
            >


            </Rodal>






        </div>
    )
}

export default ArchiveLessonTIme

// onClick={() => { navigate(`/add-teachers/${item?.id}`) }}

// onClick={() => remove_Teacher(item?.id, item?.firstName + " " + item?.lastName + " " + item?.patronymic)}