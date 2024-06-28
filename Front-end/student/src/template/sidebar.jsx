import { useDispatch } from 'react-redux';
import { exitSidebarBtn } from '../slice/register';
import { BUTTONSIDEBAR } from '../ui';
import { useNavigate } from 'react-router-dom';

function Sidebar({ open }) {
  const dispatch = useDispatch()
  const navitagate = useNavigate()
  return (
    <div>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Dark offcanvas</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <BUTTONSIDEBAR name={"Dropdown"} obj={{ drop1: "Action", drop2: "Another action", drop3: "Something else here" }} />
          <BUTTONSIDEBAR name={"Dropdown"} obj={{ drop1: "Action", drop2: "Another action", drop3: "Something else here" }} />
          <BUTTONSIDEBAR name={"Dropdown"} obj={{ drop1: "Action", drop2: "Another action", drop3: "Something else here" }} />
        </ul>
        <button onClick={() => {
          navitagate('/register')
          dispatch(exitSidebarBtn())
        }} className="btn btn-danger w-100 my-5 py-2 d-flex justify-content-between align-items-center" href="#" role="button">
          Exit
        </button>
      </div>
    </div>
  )
}

export default Sidebar