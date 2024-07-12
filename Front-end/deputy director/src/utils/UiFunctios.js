export function HomeText() {
    const path = window.location.pathname
    if (path === "/") {
        return (
            <span>New Star School</span>
        )
    } else if (path === "/class-schedule") {
        return (
            <span>Dars Jadvali</span>
        )
    }
    else if (path === "/grade-rating") {
        return (
            <span>Baxolar reytingi</span>
        )
    }
    else if (path === "/atendance") {
        return (
            <span>Davomat</span>
        )
    }
    else if (path === "/profile") {
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