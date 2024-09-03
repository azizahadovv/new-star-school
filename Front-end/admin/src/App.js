import { useEffect } from 'react';
import ReactRouter from './router/React-Router';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import student_register from './service/register';

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');
  const refreshToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    if (!token) {


      navigate('/register', { replace: true });
    }

    // Function to refresh the token
    // const refresh_Token = async () => {
    //   try {
    //     const datas = await student_register.refreshToken(refreshToken);
    //     console.log(datas.jwtToken);
    //     if (datas && datas.jwtToken) {
    //       console.log(datas.jwtToken);
    //       localStorage.setItem('jwtToken', datas.jwtToken);
    //     }
    //   } catch (error) {
    //     console.error('Failed to refresh token:', error);
    //   }
    // };

    // // Run refresh_Token every hour
    // const intervalId = setInterval(refresh_Token, 3600); // 3600000 ms = 1 hour

    // // Clean up the interval on component unmount
    // return () => clearInterval(intervalId);
  }, [token, navigate, refreshToken]);

  return (
    <div className='p-0 m-auto'>
      <ReactRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
