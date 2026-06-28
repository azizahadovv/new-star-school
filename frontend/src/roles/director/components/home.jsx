import { homeList } from "../constanta/const";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Direktor asosiy sahifa kartochkalari — Figma dizayni (rol-direktor.png).
function Home() {
  const { t } = useTranslation();
  return (
    <div className="p-4 tablet:p-6">
      <div className="grid grid-cols-2 mobil:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-4 tablet:gap-5">
        {homeList.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            title={t(item.title)}
            className="group bg-white rounded-2xl border border-[#E1EAF1] shadow-[0_2px_8px_rgba(38,48,57,.05)] hover:shadow-[0_8px_24px_rgba(38,48,57,.10)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center justify-center gap-4 py-8 px-4 no-underline"
          >
            <img className="w-20 h-20 rounded-full object-contain" src={item.icon} alt="" />
            <h3 className="text-center text-[15px] font-medium text-[#263039] leading-snug m-0">
              {t(item.title)}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
