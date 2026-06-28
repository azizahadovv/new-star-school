import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logo } from "../icons";
import { closeSidebar } from "../slice/sidebar";
import { BUTTONEXIT } from "../ui";

// Doimiy navy sidebar — Figma dizayniga 1-1 (rol-admin.png).
const NAV = [
  { to: "/", title: "main_page", fallback: "Asosiy sahifa", icon: HomeIcon, end: true },
  { to: "/class-schedule", title: "class_schedule_home", fallback: "Dars jadvali", icon: CalendarIcon },
  { to: "/list-of-classes", title: "list_of_classes_home", fallback: "Sinflar ro'yhati", icon: GridIcon },
  { to: "/teachers", title: "teacher_home", fallback: "O'qituvchilar", icon: TeacherIcon },
  { to: "/students", title: "student_home", fallback: "O'quvchilar", icon: StudentIcon },
  { to: "/list-of-subjects", title: "sciences", fallback: "Fanlar", icon: SubjectIcon },
  { to: "/profile", title: "personal_information_home", fallback: "Shaxsiy ma'lumotlar", icon: UserIcon },
];

function Sidebar() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const close = () => dispatch(closeSidebar());

  return (
    <aside className="w-[260px] h-screen shrink-0 bg-[#34414F] flex flex-col">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-white/10">
        <NavLink to="/" onClick={close}>
          <img className="h-9" src={logo} alt="New Star School" />
        </NavLink>
      </div>

      {/* Navigatsiya */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
        {NAV.map(({ to, title, fallback, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={close}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 h-12 rounded-xl no-underline transition ${
                isActive
                  ? "bg-[#475667] text-white font-semibold"
                  : "text-[#AEB3B9] hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon />
            <span className="text-[15px]">{t(title, fallback)}</span>
          </NavLink>
        ))}
      </nav>

      {/* Pastki: chiqish */}
      <div className="p-3 border-t border-white/10">
        <BUTTONEXIT />
      </div>
    </aside>
  );
}

/* === Inline oq line ikonkalar (Figma sidebar uslubi) === */
function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20h14V9.5" /><path d="M9.5 20v-6h5v6" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" /><path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  );
}
function GridIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}
function TeacherIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7.5" r="3.5" /><path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
    </svg>
  );
}
function StudentIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4z" /><path d="M6.5 10.5V15c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.5M21.5 8.5v5" />
    </svg>
  );
}
function SubjectIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3v8.5a3.5 3.5 0 1 0 6 0V3M8 3h8M7 21h6" /><circle cx="12" cy="11.5" r="1" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
    </svg>
  );
}

export default Sidebar;
