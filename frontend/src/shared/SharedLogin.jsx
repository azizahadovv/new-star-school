import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IconLight } from "../roles/admin/icons";
import authService from "./auth-service";
import { pickActiveRole, IMPLEMENTED_ROLES } from "./roles";

// Birlashtirilgan login — Figma dizayniga 1-1 (New-Star-School-Dashboard-Hujjatlari).
// Mantiq o'zgarmagan: backend qaytargan `roles` ga qarab aktiv rol tanlanadi va
// foydalanuvchi tegishli panelga yo'naltiriladi.
function SharedLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Login va parolni kiriting");
      return;
    }
    setLoading(true);
    try {
      const data = await authService.login({ username, password });
      if (!data?.jwtToken) {
        toast.error("Login yoki parol noto'g'ri");
        return;
      }
      const roles = data.roles || [];
      const activeRole = pickActiveRole(roles);
      if (!activeRole) {
        toast.error("Sizning rolingiz aniqlanmadi");
        return;
      }
      if (!IMPLEMENTED_ROLES.includes(activeRole)) {
        toast.error(`"${activeRole}" paneli hali mavjud emas`);
        return;
      }
      localStorage.setItem("jwtToken", data.jwtToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("role", activeRole);
      sessionStorage.setItem("my-users-ids", data.userId);
      toast.success("Xush kelibsiz");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error("Tizimga kirishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 bg-[linear-gradient(to_bottom,#ffffff_50%,#F4F7F9_50%)]">
      <div className="w-full max-w-[560px] flex flex-col gap-3">
        {/* Logo kartochkasi */}
        <div className="relative bg-white rounded-2xl border border-[#E1E7EC] shadow-[0_2px_8px_rgba(38,48,57,.06)] flex items-center justify-center h-36 overflow-hidden">
          <span className="absolute top-0 left-0 right-0 h-2 bg-[#263039]" />
          <img className="h-12 object-contain" src={IconLight} alt="New Star School" />
        </div>

        {/* Forma kartochkasi */}
        <form
          onSubmit={submit}
          className="bg-white rounded-2xl border border-[#E1E7EC] shadow-[0_2px_8px_rgba(38,48,57,.06)] p-6 sm:p-8 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-[#263039] leading-tight">
              Shaxsiy akkauntga kirish
            </h1>
            <p className="text-sm text-[#81909F]">
              Kirish uchun shaxsiy ma'lumotlarini kiriting
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Login input */}
            <div className="flex items-center gap-3 h-14 px-4 rounded-xl bg-[#ECF1F4] focus-within:ring-2 focus-within:ring-[#3D7CC0] transition">
              <UserIcon />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Login"
                autoComplete="username"
                className="flex-1 bg-transparent outline-none text-[15px] text-[#263039] placeholder:text-[#81909F]"
              />
            </div>

            {/* Parol input */}
            <div className="flex items-center gap-3 h-14 px-4 rounded-xl bg-[#ECF1F4] focus-within:ring-2 focus-within:ring-[#3D7CC0] transition">
              <LockIcon />
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parol"
                autoComplete="current-password"
                className="flex-1 bg-transparent outline-none text-[15px] text-[#263039] placeholder:text-[#81909F]"
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="text-[#81909F] hover:text-[#34414F] transition"
                tabIndex={-1}
                aria-label="Parolni ko'rsatish"
              >
                <EyeIcon off={showPwd} />
              </button>
            </div>
          </div>

          {/* Eslab qolish + Parolni unutdingmi */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="w-4 h-4 accent-[#34414F] rounded" />
              <span className="text-sm text-[#465566]">Eslab qolish</span>
            </label>
            <button
              type="button"
              className="text-sm font-semibold text-[#C70909] hover:underline"
            >
              Parolni unutdingmi?
            </button>
          </div>

          {/* Tugma */}
          <button
            type="submit"
            disabled={loading}
            className="h-14 rounded-xl bg-[#34414F] hover:bg-[#2C3A48] text-white font-semibold text-[15px] transition disabled:opacity-60"
          >
            {loading ? "Kirilmoqda..." : "Tizimga kirish"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* === Inline ikonkalar (assetsiz, 1-1 dizayn uchun) === */
function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#81909F]">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#81909F]">
      <rect x="4" y="10" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function EyeIcon({ off }) {
  return off ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 3l18 18M10.6 10.6a3 3 0 004.2 4.2M9.9 5.2A9.7 9.7 0 0112 5c5 0 9 4 10 7-.4 1.1-1.2 2.4-2.4 3.6M6.5 6.5C4.4 7.8 2.9 9.7 2 12c1 3 5 7 10 7 1.4 0 2.7-.3 3.9-.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M2 12c1-3 5-7 10-7s9 4 10 7c-1 3-5 7-10 7s-9-4-10-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default SharedLogin;
