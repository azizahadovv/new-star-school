import axios from 'axios';
import { toast } from 'react-toastify';

// Set to keep track of already shown errors
const shownErrors = new Set();

// Function to display a toast and avoid duplicates
const showToast = (message) => {
    if (!shownErrors.has(message)) {
        toast.error(message);
        shownErrors.add(message);

        // Clear the error after a timeout to allow future occurrences
        setTimeout(() => {
            shownErrors.delete(message);
        }, 5000); // 5 seconds timeout, adjust as needed
    }
};

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
                let errorMessage = '';

                switch (status) {
                    case 400:
                        errorMessage = error.response.data.message;
                        showToast(errorMessage);
                        break;

                    case 401:
                        errorMessage = "Ro'yxatda o'tishda xatolik. Login yoki parol noto'g'ri!";
                        showToast(errorMessage);
                        clearStorageAndRedirect();
                        break;

                    case 403:
                        errorMessage = "403 Forbidden: Access denied.";
                        showToast(errorMessage);
                        setTimeout(() => {
                            clearStorageAndRedirect();
                        }, 15000);
                        break;

                    case 404:
                        errorMessage = "404 Not Found.";
                        showToast(errorMessage);
                        break;

                    case 500:
                        errorMessage = "500 Internal Server Error.";
                        showToast(errorMessage);
                        break;

                    case 503:
                        errorMessage = "503 Service Unavailable.";
                        showToast(errorMessage);
                        break;

                    default:
                        errorMessage = `Xatolik status kodi: ${status}`;
                        showToast(errorMessage);
                        break;
                }
            } else if (error.request) {
                showToast("So'rov amalga oshirildi, lekin javob olinmadi.");
            } else {
                showToast("So'rovni sozlashda xatolik yuz berdi.");
            }

            // Xatoni qayta ishlash
            return Promise.reject(error);
        }
    );
};

export default setupAxiosInterceptors;