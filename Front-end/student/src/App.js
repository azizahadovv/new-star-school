import { ToastContainer } from 'react-toastify';
import ReactRouter from './router/React-Router'
import { useNavigate } from 'react-router-dom';
function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token');
  return (
    <div className='p-0 m-auto'>
      <ReactRouter />
      <ToastContainer />
    </div>
  )
}

export default App