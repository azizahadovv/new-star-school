import { useDispatch } from "react-redux";
import "./navbar.css";
import { openVisible } from "../slice/sidebar";
import { LANGUAGEPOTION } from "../ui";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import user_register from "../service/user";
import { useNavigate } from "react-router-dom";

// Topbar — Figma dizayni (topbar.png): sahifa nomi · til · qo'ng'iroq · avatar.
function Navbar() {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem("my-users-ids");

  const path = window.location.pathname;
  const title =
    path === "/" ? t("main_page", "Asosiy sahifa") : t(titleKey(path), "New Star School");

  useEffect(() => {
    if (user_id) {
      (async () => {
        try {
          const data = await user_register.getUserData(user_id);
          if (data) {
            setFirstName(data.firstName || "");
            setName(data.lastName || "");
            setImage(data.imageUrl || "");
          }
        } catch (e) {
          /* ignore */
        }
      })();
    }
  }, [user_id]);

  return (
    <header className="h-20 shrink-0 bg-white border-b border-[#E1EAF1] flex items-center justify-between px-4 tablet:px-6 gap-3">
      {/* Chap: menyu (mobil) + sarlavha */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => dispatch(openVisible())}
          className="tablet:hidden w-10 h-10 rounded-lg bg-[#EEF3F7] border border-[#E1EAF1] flex items-center justify-center text-[#34414F]"
          aria-label="Menyu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <h1 className="font-bold text-2xl m-0 text-[#263039] truncate">{title}</h1>
      </div>

      {/* O'ng: til · qo'ng'iroq · avatar */}
      <div className="flex items-center gap-3 tablet:gap-4">
        <div className="hidden mobil:block">
          <LANGUAGEPOTION />
        </div>

        <button
          className="w-10 h-10 rounded-full hover:bg-[#EEF3F7] flex items-center justify-center text-[#465566] transition"
          aria-label="Bildirishnomalar"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
        </button>

        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <Avatar image={image} firstName={firstName} name={name} />
          <div className="hidden mobil:flex flex-col leading-tight">
            <span className="text-[15px] font-bold text-[#263039]">
              {firstName} {name}
            </span>
            <span className="text-xs font-semibold text-[#81909F]">{t("admin")}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function Avatar({ image, firstName, name }) {
  const [broken, setBroken] = useState(false);
  if (image && !broken) {
    return (
      <img
        className="w-11 h-11 rounded-full object-cover"
        src={image}
        alt="avatar"
        onError={() => setBroken(true)}
      />
    );
  }
  const initials =
    `${firstName?.[0] || ""}${name?.[0] || ""}`.toUpperCase() || "U";
  return (
    <div className="w-11 h-11 rounded-full bg-[#34414F] text-white flex items-center justify-center font-semibold">
      {initials}
    </div>
  );
}

function titleKey(path) {
  const map = {
    "/list-of-subjects": "sciences",
    "/class-schedule": "class_schedule_home",
    "/list-of-classes": "list_of_classes_home",
    "/teachers": "teacher_home",
    "/students": "student_home",
    "/profile": "personal_information_home",
    "/add-student": "add_student",
    "/add-teachers": "add_teacher",
    "/settings": "settings",
  };
  return map[path] || "main_page";
}

export default Navbar;
