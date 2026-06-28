import { useTranslation } from "react-i18next"

export function HomeText() {
    const { t } = useTranslation()
    const path = window.location.pathname
    if (path === "/") {
        return (
            <span>New Star School</span>
        )
    } else if (path === "/ratings") {
        return (
            <span>{t("rating_home")}</span>
        )
    }
    else if (path === "/teachers") {
        return (
            <span>{t("teacher_home")}</span>
        )
    }
    else if (path === "/students") {
        return (
            <span>{t("student_home")}</span>
        )
    } else if (path === "/profile") {
        return (
            <span>{t("personal_information_home")}</span>
        )
    }
    else if (path === "/personnel") {
        return (
            <span>{t("personnel_home")}</span>
        )
    }
    else if (path === "/personal-information") {
        return (
            <span>{t("personal_information_home")}</span>
        )
    }
    else {
        return (
            <span>New Star School</span>
        )
    }
}