import { useEffect } from 'react';
import ReactRouter from './router/React-Router'
import { useNavigate } from 'react-router-dom';
function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token');
  return (
    <div className='p-0 m-auto'>
      <ReactRouter />
    </div>
  )
}

export default App