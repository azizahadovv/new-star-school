import { useEffect } from 'react';
import ReactRouter from './router/React-Router';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import student_register from './service/register';

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const clearStorageAndRedirect = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login', { replace: true });
  };

  const refresh_Token = async () => {
    try {
      const datas = await student_register.refreshToken(refreshToken);
      const isTokenValid = await student_register.ValidateToken(token);

      if (!isTokenValid || !datas || datas.error) {
        clearStorageAndRedirect();
      } else {
        updateTokens(datas.jwtToken, datas.refreshToken);
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
      clearStorageAndRedirect();
    }
  };

  const updateTokens = (newToken, newRefreshToken) => {
    localStorage.setItem('jwtToken', newToken);
    localStorage.setItem('refreshToken', newRefreshToken);
  };

  const handle403Error = () => {
    if (window.location.pathname === '/login') {
      clearStorageAndRedirect();
    }
  };

  useEffect(() => {
    if (window.location.pathname === '/login' || !token) {
      clearStorageAndRedirect();
    }

    // Sahifani faqat birinchi marta '/' sahifasiga tashrif buyurganda yangilash
    if (window.location.pathname === '/' && !sessionStorage.getItem('refreshed')) {
      sessionStorage.setItem('refreshed', 'true');
      window.location.reload();
    } else return

    const intervalId = setInterval(refresh_Token, 3600000); // Run every hour

    window.addEventListener('error', handle403Error);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('error', handle403Error);
    };
  }, [token, navigate, refreshToken]);

  return (
    <div className='p-0 m-auto'>
      <ReactRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
