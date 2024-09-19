import { Container } from "../constanta/style";
import { settings } from "../constanta/const";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Setings() {
  const { t } = useTranslation();
  return (
    <div
      className={`p-6 min-h-[360px] rounded-lg ${Container} flex flex-wrap gap-4 tablet:items-start tablet:justify-start minMobil:items-center minMobil:justify-center`}
    >
      {settings.map((item) => (
        <Link
          title={t(item.title)}
          to={item.link}
          key={item.id}
          className="shadow-home-page rounded-xl flex flex-col items-center justify-center gap-3 tablet:w-64 tablet:h-64 minMobil:w-72 minMobil:h-72 no-underline"
        >
          <img className="w-50 rounded-full" src={item.img} alt="image" />
          <h3 className="w-44 text-center">{t(item.title)}</h3>
        </Link>
      ))}
    </div>
  );
}

export default Setings;
