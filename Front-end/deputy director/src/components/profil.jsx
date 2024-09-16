import { useSelector } from "react-redux"
import { Container, styleTopBarUINoFlex } from "../constanta/style"
import { EDIT, ICONIMG, userIcon } from "../icons"
import { BUTTONEXIT } from "../ui"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import user_register from "../service/user"
import { toast } from "react-toastify"

function Profil() {
    const open = useSelector(sel => sel.sidebarReduser.open)
    const { t } = useTranslation()
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
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
        <div className={`${Container} flex items-start justify-center tablet:flex-row minMobil:flex-col ${open ? 'hidden' : 'flex'}`}>
            <div className={`minMobil:w-full flex items-center justify-start flex-col gap-1 tablet:w-[310px] px-2 `}>
                <div className={`${styleTopBarUINoFlex} flex items-center flex-col justify-start gap-3 px-3 py-4`}>
                    <img className="rounded-lg" width={220} height={220} src={userData.imageUrl ? userData.imageUrl : userIcon} alt="" />
                    <label onChange={(e) => saveImage(e.target.files[0])} className="w-full">
                        <input type="file" hidden />
                        <span className="flex items-center justify-center w-full gap-1 border border-brGray py-2 rounded-lg bg-lightGray"><img src={ICONIMG} alt="" />{t("edit")}</span>
                    </label>
                </div>
                <div className="p-1 tablet:w-full minMobil:w-[310px] ">
                    <BUTTONEXIT />
                </div>
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
                    {/* <button className="bg-blue px-4 py-2 text-white rounded-lg flex items-center justify-center gap-2 font-semibold">
                        <img width={15} height={15} src={EDIT} alt="EDIT" />
                        {t("edit")}
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default Profil