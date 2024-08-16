import { Link } from "react-router-dom"

export function HomeText() {
    const path = window.location.pathname
    if (path === "/") {
        return (
            <Link to={'/'}>New Star School</Link>
        )
    } else if (path === "/list-of-classes") {
        return (
            <span>Sinflar</span>
        )
    }
    else {
        return (
            <Link to={'/'}>New Star School</Link>
        )
    }
}