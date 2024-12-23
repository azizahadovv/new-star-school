import { useTranslation } from "react-i18next"
import { Container, styleTopBarUINoFlex } from "../constanta/style"
import { EDIT, ICONIMG, userIcon } from "../icons"
import { BUTTONEXIT } from "../ui"
import studentCotrol from "../service/student"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

function Profil() {
    const { t } = useTranslation()
    const user_id = sessionStorage.getItem('my-users-ids')
    const [dataTeacher, setDataTeacher] = useState({})
    useEffect(() => {
        getUserData()
    }, [user_id])

    const getUserData = async () => {
        const data = await studentCotrol.getStudentInId(user_id)
        setDataTeacher(data);
    }

    const saveImage = async (e) => {
        const maxFileSize = 3 * 1024 * 1024; // 3MB
        const allowedExtensions = /\.(jpg|jpeg|png|gif|svg)$/i;

        if (!allowedExtensions.test(e?.name)) {
            toast.error("File extension should be jpg, jpeg, png, gif, svg");
            return;
        }

        if (e.size > maxFileSize) {
            toast.error("File size should not exceed 3MB");
            return;
        }

        const formData = new FormData();
        formData.append('file', e);

        await studentCotrol.uploadImg(user_id, formData);
        getUserData();

    }

    return (
        <div className={`${Container} flex tablet:items-start minMobil:items-center tablet:justify-start minMobil:justify-center gap-3 flex-wrap`}>
            <div className={`${styleTopBarUINoFlex} w-[300px] h-[380px] p-3 rounded-3xl flex items-center justify-between flex-col`}>
                <div className='w-full h-[80%] flex items-center justify-center rounded-xl overflow-hidden cursor-pointer'>
                    {
                        dataTeacher?.imageUrl === null ? <div className='w-40 h-40 flex items-center justify-center rounded-full overflow-hidden bg-blue uppercase'>
                            <span className='text-6xl text-white flex items-center justify-center'>{dataTeacher?.firstName.charAt(0) + "." + dataTeacher?.lastName.charAt(0)}</span>
                        </div> : <img className='rounded-full w-full h-full' src={dataTeacher?.imageUrl} alt="dataTeacher.image" />
                    }
                </div>
                <label className={`py-[10px] px-3 w-full ${"bg-lightGray text-textBlack"} border border-brGray rounded-xl mt-2 flex items-center justify-center gap-2 cursor-pointer`}>
                    <input onChange={(e) => saveImage(e.target.files[0])} hidden type="file" />
                    <span className='flex items-center justify-center gap-2'>
                        <img src={ICONIMG} alt="ICONIMG" />
                        {t("edit")}
                    </span>
                </label>
                <BUTTONEXIT />
            </div>
            <div className={`${styleTopBarUINoFlex} tablet:w-3/4 minMobil:w-full min-h-20 px-3 py-2`}>
                <div className='flex items-center justify-start min-h-16 border-b border-brGray mb-3'>
                    <h3 className='text-blue font-bold'>{t('personal_information_home')}</h3>
                </div>
                <table className="table table-striped table-hover">
                    <tbody>
                        <tr>
                            <th className='w-50'>{t('firstName')}:</th>
                            <th className='w-50'>{dataTeacher?.firstName || '-'}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t('lastName')}:</th>
                            <th className='w-50'>{dataTeacher?.lastName || '-'}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t('patronymic')}:</th>
                            <th className='w-50'>{dataTeacher?.patronymic || '-'}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t('birthday')}:</th>
                            <th className='w-50'>{dataTeacher?.birthDate || '-'}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t('gender')}:</th>
                            <th className='w-50'>{dataTeacher?.gender || '-'}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t('nation')}:</th>
                            <th className='w-50'>{dataTeacher?.nationality || '-'}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t('state')}:</th>
                            <th className='w-50'>{dataTeacher?.country || '-'}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t('province')}:</th>
                            <th className='w-50'>{dataTeacher?.region || '-'}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t('district')}:</th>
                            <th className='w-50'>{dataTeacher?.district || '-'}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t('home_address')}:</th>
                            <th className='w-50'>{dataTeacher?.address || '-'}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t('class')}:</th>
                            <th className='w-50'>{dataTeacher?.grade || '-'}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t('phone_number')}:</th>
                            <th className='w-50'>{dataTeacher?.phoneNumber || '-'}</th>
                        </tr>
                        <tr>
                            <th className='w-50'>{t('login')}:</th>
                            <th className='w-50'>{dataTeacher?.login || '-'}</th>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Profil