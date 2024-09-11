import { useEffect } from 'react';
import ReactRouter from './router/React-Router';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import student_register from './service/register';
import setupAxiosInterceptors from './service/axiosInterceptor'; // Interceptorni import qiling

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const id = sessionStorage.getItem('my-users-ids');

  // Tokenlarni tozalash va foydalanuvchini login sahifasiga yo'naltirish
  const clearStorageAndRedirect = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login', { replace: true });
  };

  // Tokenni yangilash funksiyasi
  const refresh_Token = async () => {
    // Login sahifasida refresh token ishlamasligi uchun shart
    if (window.location.pathname === '/login') return;

    try {
      const datas = await student_register.refreshToken(refreshToken);
      const isTokenValid = await student_register.ValidateToken(token);

      if (!isTokenValid || !datas || datas.error) {
        // Token yangilanmagan yoki yaroqsiz bo'lsa login sahifasiga yo'naltirish
        clearStorageAndRedirect();
      } else {
        // Yangi tokenlar mavjud bo'lsa, ularni saqlash
        updateTokens(datas.jwtToken, datas.refreshToken);
      }
    } catch (error) {
      // Login sahifasida xatoliklarni ko'rsatmaslik
      if (window.location.pathname !== '/login') {
        console.error('Failed to refresh token:', error);
        clearStorageAndRedirect();
      }
    }
  };

  // Tokenlarni yangilash funksiyasi
  const updateTokens = (newToken, newRefreshToken) => {
    localStorage.setItem('jwtToken', newToken);
    localStorage.setItem('refreshToken', newRefreshToken);
  };

  useEffect(() => {
    // Agar foydalanuvchi login qilmagan yoki tokenlar yo'q bo'lsa login sahifasiga yo'naltirish
    if (window.location.pathname === '/login' || !token || !id) {
      clearStorageAndRedirect();
    }

    // Sahifani faqat birinchi marta '/' sahifasiga tashrif buyurganda yangilash
    if (window.location.pathname === '/' && !sessionStorage.getItem('refreshed')) {
      sessionStorage.setItem('refreshed', 'true');
      window.location.reload();
    }

    // Interceptorni sozlash
    setupAxiosInterceptors(clearStorageAndRedirect);

    // Tokenni har bir soatda yangilash uchun interval
    const intervalId = setInterval(refresh_Token, 360000); // 1 soatda bir marta

    // Komponent unmounted bo'lganda intervalni tozalash
    return () => {
      clearInterval(intervalId);
    };
  }, [token, navigate, id]);

  return (
    <div className='p-0 m-auto'>
      <ReactRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
