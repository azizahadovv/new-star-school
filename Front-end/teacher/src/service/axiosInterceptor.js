import axios from 'axios';
import { toast } from 'react-toastify';

// Axios interceptorni sozlash
const setupAxiosInterceptors = (clearStorageAndRedirect) => {
    axios.interceptors.response.use(
        (response) => {
            // Agar javob muvaffaqiyatli bo'lsa
            return response;
        },
        (error) => {
            // Xato obyekti borligini tekshirish
            if (error.response) {
                const status = error.response.status;

                switch (status) {
                    case 400:
                        toast.error("400 Bad Request:", error.response);
                        // 400 xatosi uchun mantiq (xato so'rov)
                        break;

                    case 401:
                        toast.error("401 Unauthorized:", error.response);
                        // 401 xatosi uchun mantiq (auth xatoliklari, foydalanuvchi login qilish kerak)
                        clearStorageAndRedirect();
                        break;

                    case 403:
                        toast.error("403 Forbidden:", error.response);
                        // 403 xatosi uchun mantiq (ruxsat etilmagan kirish)
                        clearStorageAndRedirect();
                        break;

                    case 404:
                        toast.error("404 Not Found:", error.response);
                        // 404 xatosi uchun mantiq (sahifa yoki resurs topilmadi)
                        break;

                    case 500:
                        toast.error("500 Internal Server Error:", error.response);
                        // 500 xatosi uchun mantiq (server xatosi)
                        break;

                    case 503:
                        toast.error("503 Service Unavailable:", error.response);
                        // 503 xatosi uchun mantiq (xizmat vaqtincha ishlamayapti)
                        break;

                    default:
                        toast.error(`Xatolik status kodi: ${status}`, error.response);
                        // Boshqa status kodlari uchun umumiy mantiq
                        break;
                }
            } else if (error.request) {
                // Agar so'rov amalga oshirilgan bo'lsa, ammo javob kelmasa
                toast.error("So'rov amalga oshirildi, lekin javob olinmadi:", error.request);
            } else {
                // Xatolik so'rovni sozlash jarayonida yuz bergan bo'lsa
                toast.error("So'rovni sozlashda xatolik yuz berdi:", error.message);
            }

            // Xatoni qayta ishlash
            return Promise.reject(error);
        }
    );
};

export default setupAxiosInterceptors;