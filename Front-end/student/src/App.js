import React, { useEffect } from 'react'
import ReactRouter from './router/React-Router'
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate } from 'react-router-dom';
import { PageNoteFound } from './components';
function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token');

  // useEffect(() => {
  //   if (!token) {
  //     navigate('/register')
  //   } else {
  //     navigate('/')
  //   }
  // }, [])


  return (
    <div className=' w-full h-full bg-[#e9e9e9]'>
      <ReactRouter />
    </div>
  )
}

export default App