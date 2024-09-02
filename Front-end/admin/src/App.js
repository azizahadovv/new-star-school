import { useEffect } from 'react';
import ReactRouter from './router/React-Router';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import student_register from './service/register';

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    if (!token) {
      navigate('/register', { replace: true });
    }
  }, [token, navigate]);

  const refreshToken = async () => {
    try {
      const newToken = await student_register.refreshToken(token);
      localStorage.setItem('jwtToken', newToken);
    } catch (error) {
      console.error("Error refreshing token:", error);
      // Bildirishnoma ko'rsatish
      toast.error("Sessiya tugadi. Iltimos, qayta kiring.");
      // JWT tokenni tozalash
      localStorage.removeItem('jwtToken');
      // Foydalanuvchini register sahifasiga jo'natish
      navigate('/register', { replace: true });
      // Sahifani yangilash
      window.location.reload();
    }
  }

  useEffect(() => {
    // Har bir soatda tokenni yangilash uchun interval o'rnatish
    const intervalId = setInterval(refreshToken, 3600000); // 1 soat = 3600000 ms

    // Komponent unmounted bo'lganda intervalni tozalash
    return () => clearInterval(intervalId);
  }, [token]);

  return (
    <div className='p-0 m-auto'>
      <ReactRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
