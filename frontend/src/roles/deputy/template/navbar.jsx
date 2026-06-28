import { useDispatch } from "react-redux";
import "./navbar.css";
import { openVisible } from "../slice/sidebar";
import { LANGUAGEPOTION } from "../ui";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { HomeText } from "../utils/UiFunctios";

// Universal topbar — barcha rollar uchun (Figma topbar.png).
const ROLE_LABEL = {
  ADMIN: "Administrator",
  TEACHER: "O'qituvchi",
  STUDENT: "O'quvchi",
  DIRECTOR: "Direktor",
  DEPUTY_DIRECTOR: "Zavuch",
};

function Navbar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const roleLabel = ROLE_LABEL[role] || "";
  const path = window.location.pathname;

  let title = "New Star School";
  try {
    title = path === "/" ? t("main_page", "Asosiy sahifa") : HomeText().props.children;
  } catch (e) {
    title = "New Star School";
  }

  return (
    <header className="h-20 shrink-0 bg-white border-b border-[#E1EAF1] flex items-center justify-between px-4 tablet:px-6 gap-3">
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
          <div className="w-11 h-11 rounded-full bg-[#34414F] text-white flex items-center justify-center font-semibold">
            {(roleLabel[0] || "U").toUpperCase()}
          </div>
          <div className="hidden mobil:flex flex-col leading-tight">
            <span className="text-[15px] font-bold text-[#263039]">{roleLabel}</span>
            <span className="text-xs font-semibold text-[#81909F]">New Star School</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
