import { useTranslation } from "react-i18next"

export function HomeText() {
    const { t } = useTranslation()
    const path = window.location.pathname
    if (path === "/") {
        return (
            <span>New Star School</span>
        )
    } else if (path === "/class-schedule") {
        return (
            <span>{t("class_schedule_home")}</span>
        )
    }
    else if (path === "/grade-rating") {
        return (
            <span>{t("ratings_home")}</span>
        )
    }
    else if (path === "/atendance") {
        return (
            <span>{t("attendance")}</span>
        )
    }
    else if (path === "/profile") {
        return (
            <span>{t("personal_information_home")}</span>
        )
    }
    else {
        return (
            <span></span>
        )
    }
}