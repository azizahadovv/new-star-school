import { useSelector } from "react-redux";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { EDIT, ICONIMG, userIcon } from "../icons";
import { BUTTONEXIT } from "../ui";
import { useTranslation } from "react-i18next";
import user_register from "../service/user";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Profil() {
    const open = useSelector((state) => state.sidebarReduser.open);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const { t } = useTranslation();
    const user_id = sessionStorage.getItem('my-users-ids'); // Assume this is updated in session storage

    useEffect(() => {
        if (user_id) {
            getUserDate(user_id);
        }
    }, [user_id]);

    const getUserDate = async (id) => {
        setLoading(true);
        try {
            const data = await user_register.getUserData(id);
            setUserData(data);
            setError(null); // Clear any previous errors
        } catch (error) {
            setError(error.message); // Update error state
            toast.error(t("no_date")); // Display error message
        } finally {
            setLoading(false);
        }
    };



    const saveImage = async (e) => {
        const maxFileSize = 3 * 1024 * 1024; // 3MB
        const allowedExtensions = /\.(jpg|jpeg|png|gif|svg)$/i;

        if (!allowedExtensions.test(e?.name)) {
            toast.error(t("file_extension_error"));
            return;
        }

        if (e.size > maxFileSize) {
            toast.error(t("file_size_error"));
            return;
        }

        const formData = new FormData();
        formData.append('file', e);

        try {
            await user_register.uploadImg(user_id, formData);
            getUserDate(user_id); // Fayl yuklanganidan keyin yangilanadigan ma'lumotlar
        } catch (error) {
            toast.error(t("upload_error"));
        }
    };



    return (
        <div className={`${Container} flex tablet:items-start minMobil:items-center justify-center tablet:flex-row minMobil:flex-col ${open ? 'hidden' : 'flex'} gap-5`}>
            <div className={`${styleTopBarUINoFlex} w-[300px] h-[380px] p-3 rounded-3xl flex items-center justify-between flex-col`}>
                <div className='w-full h-[80%] flex items-center justify-center rounded-xl overflow-hidden cursor-pointer'>
                    {
                        userData?.imageUrl === null ? <div className='w-40 h-40 flex items-center justify-center rounded-full overflow-hidden bg-blue uppercase'>
                            <span className='text-6xl text-white flex items-center justify-center'>{userData?.firstName.charAt(0) + "." + userData?.lastName.charAt(0)}</span>
                        </div> : <img className='rounded-full w-full h-full' src={userData?.imageUrl} alt="dataTeacher.image" />
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
            <div className="minMobil:w-full min-h-max tablet:max-w-full">
                <div className={`flex flex-col min-h-96 items-start justify-start ${styleTopBarUINoFlex} p-3 overflow-scroll tablet:max-w-[85%]`}>
                    <h2 className="text-blue font-bold">{t("personal_information")}</h2>
                    {loading ? (
                        <p>{t("loading")}</p> // Add a loading state message
                    ) : (
                        <table className="table table-hover cursor-pointer">
                            <tbody>
                                <tr>
                                    <th className="w-50">{t("firstName")}:</th>
                                    <th className="w-50">{userData?.firstName || '-'}</th>
                                </tr>
                                <tr>
                                    <th className="w-50">{t("lastName")}:</th>
                                    <th className="w-50">{userData?.lastName || '-'}</th>
                                </tr>
                                <tr>
                                    <th className="w-50">{t("patronymic")}:</th>
                                    <th className="w-50">{userData?.patronymic || '-'}</th>
                                </tr>
                                <tr>
                                    <th className="w-50">{t("birthday")}:</th>
                                    <th className="w-50">{userData?.birthDate || '-'}</th>
                                </tr>
                                <tr>
                                    <th className="w-50">{t("gender")}:</th>
                                    <th className="w-50">{userData?.gender || '-'}</th>
                                </tr>
                                <tr>
                                    <th className="w-50">{t("nation")}:</th>
                                    <th className="w-50">{userData?.nationality || '-'}</th>
                                </tr>
                                <tr>
                                    <th className="w-50">{t("state")}:</th>
                                    <th className="w-50">{userData?.country || '-'}</th>
                                </tr>
                                <tr>
                                    <th className="w-50">{t("province")}:</th>
                                    <th className="w-50">{userData?.region || '-'}</th>
                                </tr>
                                <tr>
                                    <th className="w-50">{t("district")}:</th>
                                    <th className="w-50">{userData?.district || '-'}</th>
                                </tr>
                                <tr>
                                    <th className="w-50">{t("home_address")}:</th>
                                    <th className="w-50">{userData?.address || '-'}</th>
                                </tr>
                                <tr>
                                    <th className="w-50">{t("phone_number")}:</th>
                                    <th className="w-50">{userData?.phoneNumber || '-'}</th>
                                </tr>
                                <tr>
                                    <th className="w-50">{t("login")}:</th>
                                    <th className="w-50">{userData?.login || '-'}</th>
                                </tr>
                            </tbody>
                        </table>
                    )}
                    <button className="bg-blue px-4 py-2 text-white rounded-lg flex items-center justify-center gap-2 font-semibold">
                        <img width={15} height={15} src={EDIT} alt="EDIT" />
                        {t("edit")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profil;
