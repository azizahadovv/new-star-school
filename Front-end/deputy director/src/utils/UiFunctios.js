export function HomeText() {
    const path = window.location.pathname
    if (path === "/") {
        return (
            <span>New Star School</span>
        )
    } else if (path === "/my-classes") {
        return (
            <span>Mening Sinflarim</span>
        )
    }
    else if (path === "/class-schedule") {
        return (
            <span>Dars Jadvali</span>
        )
    }
    else if (path === "/list-of-classes") {
        return (
            <span>Sinflar Ro'yxati</span>
        )
    }
    else if (path === "/teachers") {
        return (
            <span>O'qituvchilar</span>
        )
    }
    else if (path === "/students") {
        return (
            <span>O'quvchilar</span>
        )
    } else if (path === "/profile") {
        return (
            <span>Shaxsiy ma’lumotlar</span>
        )
    }
    else {
        return (
            <span></span>
        )
    }
}