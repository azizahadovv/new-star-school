import ReactRouter from './router/React-Router'
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className='p-0 m-auto'>
      <ReactRouter />
      <ToastContainer />
    </div>
  )
}

export default App