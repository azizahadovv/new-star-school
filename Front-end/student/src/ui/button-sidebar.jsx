import React from 'react'
import { Link } from 'react-router-dom'

function ButtonSidebar({ img, obj, name, boolean }) {
  const path = window.location.pathname
  return (
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle d-flex justify-content-between align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <div className='flex gap-2 text-[18px]'> <img src={img} width={20} alt="##" /> {name}</div>
      </a>
      <ul className={`${boolean === true ? "hidden" : "block"} dropdown-menu`}>
        <li><a className="dropdown-item" href="#">{obj.drop1}</a></li>
        <li><a className="dropdown-item" href="#">{obj.drop2}</a></li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li><a className="dropdown-item" href="#">{obj.drop3}</a></li>
      </ul>
    </li>
  )
}

export default ButtonSidebar