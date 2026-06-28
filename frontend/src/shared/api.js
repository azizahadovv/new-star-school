import axios from "axios";
import { API_BASE_URL } from "./config";

// Yagona axios instansiyasi — barcha rollar shu yerdan foydalanadi (universal).
axios.defaults.baseURL = API_BASE_URL;

// Token har bir so'rovda real vaqtda qo'shiladi (stale-token bug'ining yechimi).
// Avval har service o'z header obyektini modul yuklanishida bir marta qurardi
// (Bearer null muammosi). Endi interceptor doim joriy tokenni oladi.
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers = config.headers || {};
    if (!config.headers.Authorization) {
      config.headers.Authorization = "Bearer " + token;
    }
  }
  return config;
});

export default axios;
