import { useEffect } from 'react';
import ReactRouter from './router/React-Router'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem('jwtToken');
  useEffect(() => {
    if (!token) {
      navigate('/register', { replace: true });
    }
  }, [token, navigate])

  return (
    <div className='p-0 m-auto'>
      <ReactRouter />
      <ToastContainer />
    </div>
  )
}

export default App