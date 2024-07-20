import { useNavigate } from "react-router-dom"
import { ARRLEFT } from "../icons"

export function HomeText() {
    const navigate = useNavigate()
    const path = window.location.pathname
    if (path === "/") {
        return (
            <span>New Star School</span>
        )
    } else if (path === "/list-of-subjects") {
        return (
            <span>Fanlar  </span>
        )
    }
    else if (path === "/class-schedule") {
        return (
            <span>Dars Jadvali </span>
        )
    }
    else if (path === "/list-of-classes") {
        return (
            <span>Sinflar Ro'yxati </span>
        )
    }
    else if (path === "/teachers") {
        return (
            <span>O'qituvchilar </span>
        )
    }
    else if (path === "/students") {
        return (
            <span>O'quvchilar </span>
        )
    } else if (path === "/add-student") {   
        return (
            <span>O'quvchi Qo'shish </span>
        )
    } else if (path === "/profile") {
        return (
            <span>Shaxsiy ma’lumotlar </span>
        )
    }
    else {
        return (
            <span>New Star School</span>
        )
    }
}