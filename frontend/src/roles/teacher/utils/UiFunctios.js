import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export function HomeText() {
    const { t } = useTranslation()

    const path = window.location.pathname
    if (path === "/") {
        return (
            <Link to={'/'}>New Star School</Link>
        )
    } else if (path === "/list-of-classes") {
        return (
            <span>{t("list_of_classes_home")}</span>
        )
    }
    else {
        return (
            <Link to={'/'}>New Star School</Link>
        )
    }
}