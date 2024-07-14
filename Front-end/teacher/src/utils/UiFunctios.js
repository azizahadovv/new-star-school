export function HomeText() {
    const path = window.location.pathname
    if (path === "/") {
        return (
            <span>New Star School</span>
        )
    } else if (path === "/list-of-classes") {
        return (
            <span>Sinflar</span>
        )
    }
    else {
        return (
            <span></span>
        )
    }
}