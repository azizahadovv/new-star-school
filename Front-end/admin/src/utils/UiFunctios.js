import { useNavigate } from "react-router-dom"
import { ARRLEFT } from "../icons"
import { useTranslation } from "react-i18next"

export function HomeText() {
    const {t}=useTranslation()
    const path = window.location.pathname
    if (path === "/") {
        return (
            <span>New Star School</span>
        )
    } else if (path === "/list-of-subjects") {
        return (
            <span>{t("sciences")}</span>
        )
    }
    else if (path === "/class-schedule") {
        return (
            <span>{t("class_schedule_home")}</span>
        )
    }
    else if (path === "/list-of-classes") {
        return (
            <span>{t("list_of_classes_home")}</span>
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
    } else if (path === "/add-student") {   
        return (
            <span>{t("add_student")}</span>
        )
    } else if (path === "/profile") {
        return (
            <span>{t("personal_information_home")}</span>
        )
    }
    else if (path === "/add-teachers") {
        return (
            <span>{t("add_teacher")}</span>
        )
    }
    else {
        return (
            <span>New Star School</span>
        )
    }
}