import React from 'react'
import { Link } from 'react-router-dom'

function ButtonSidebar({ obj, name }) {
  const path = window.location.pathname
  return (
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle d-flex justify-content-between align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        {name}
      </a>
      <ul className="dropdown-menu dropdown-menu-dark">
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