import { Link } from "react-router-dom";
import { COACH, MENUDOTS } from "../icons";
import { useTranslation } from "react-i18next";

function CardClasess({ data }) {
  const { t } = useTranslation()
  return (
    <div className="tabletIst:w-[330px] minMobil:w-full mobil:w-[250px] h-20 border-card rounded-lg px-3 py-2 flex">
      <div
        to={`${data.id}`} className="uppercase no-underline w-full flex flex-col text-blue"
      >

        <div className="flex items-center justify-between">
          <Link to={`grade/${String(data.id)}`} className="no-underline w-[90%]">{data.grade + data.groupLetter} {t("table_classes")}</Link>
          <div className="dropdown">
            <button style={{ width: "25px", height: '25px', padding: "0", display: "flex", alignItems: "center", justifyContent: "center" }} className="btn" type="button" data-bs-toggle="dropdown" >
              <img width={15} height={15} src={MENUDOTS} alt="MENUDOTS" />
            </button>
            <ul className="dropdown-menu">
              <li><Link to={`grade/${String(data.id)}`} className="dropdown-item capitalize">{t("assessment")}</Link></li>
              <li><Link to={`view-ratings/${String(data.id)}`} className="dropdown-item capitalize" >{t("view_prices")}</Link></li>
            </ul>
          </div>
        </div>
        <Link to={`grade/${String(data.id)}`} className="text-textGray font-mono lowercase flex items-start justify-start mt-2 gap-2 text-lg w-full no-underline"><img src={COACH} alt="COACH" /> {data.size}{t("number_of_students")}</Link>
      </div>

    </div>
  );
}

export default CardClasess;
