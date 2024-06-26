import React from 'react'
import ReactRouter from './router/React-Router'
import 'font-awesome/css/font-awesome.min.css';
import Navbar from './template/navbar';
function App() {
  return (
    <div className=' w-full h-full bg-[#e9e9e9]'>
      <Navbar />
      <ReactRouter />
      <div className='w-full h-20'>
        </div>   
    </div>
  )
}

export default App