import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logo } from "../icons";
import { closeSidebar } from "../slice/sidebar";
import { BUTTONEXIT } from "../ui";
import NavIcon from "../../../shared/NavIcon";

// Doimiy navy sidebar — Figma dizayni (rol-admin.png). NAV roli bo'yicha (RBAC).
const NAV = [
  { to: "/", title: "main_page", fallback: "Asosiy sahifa", end: true },
  { to: "/class-schedule", title: "class_schedule_home", fallback: "Dars jadvali" },
  { to: "/grade-rating", title: "ratings_home", fallback: "Baholar reytingi" },
  { to: "/atendance", title: "attendance", fallback: "Davomat" },
  { to: "/profile", title: "personal_information_home", fallback: "Shaxsiy ma'lumotlar" },
];

function Sidebar() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const close = () => dispatch(closeSidebar());

  return (
    <aside className="w-[260px] h-screen shrink-0 bg-[#34414F] flex flex-col">
      <div className="h-20 flex items-center px-6 border-b border-white/10">
        <NavLink to="/" onClick={close}>
          <img className="h-9" src={logo} alt="New Star School" />
        </NavLink>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
        {NAV.map(({ to, title, fallback, end }) => (
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
            <NavIcon name={title} />
            <span className="text-[15px]">{t(title, fallback)}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10">
        <BUTTONEXIT />
      </div>
    </aside>
  );
}

export default Sidebar;
