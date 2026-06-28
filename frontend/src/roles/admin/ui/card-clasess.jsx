import { Link } from "react-router-dom";
import { COACH } from "../icons";
import { useTranslation } from "react-i18next";

function CardClasess({ data }) {
  const { t } = useTranslation();
  return (
    <div className="tabletIst:w-[320px] minMobil:w-full mobil:w-[250px] h-20 border-card rounded-lg px-3 py-2 flex grow-effect">
      <Link
        to={`${data.id}`} className="uppercase no-underline w-full flex flex-col text-blue"
      >
        {data.grade + data.groupLetter} {t("table_classes")}
        <span className="text-textGray font-mono lowercase flex items-start justify-start mt-2 gap-2 text-lg"><img src={COACH} alt="COACH" /> {data.size} {t("number_of_students")}</span>
      </Link>
    </div>
  );
}

export default CardClasess;
