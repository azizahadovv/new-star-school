import { Link } from "react-router-dom";
import { COACH } from "../icons";

function CardClasess({ data }) {
  return (
    <div className="tabletIst:w-[320px] minMobil:w-full mobil:w-[250px] h-20 border-card rounded-lg px-3 py-2 flex grow-effect">
      <Link
        to={`${data.id}`} className="uppercase no-underline w-full flex flex-col text-blue"
      >
        {data.name}
        <span className="text-textGray font-mono lowercase flex items-start justify-start mt-2 gap-2 text-lg"><img src={COACH} alt="COACH" /> {data.size} ta o‘quvchi</span>
      </Link>
    </div>
  );
}

export default CardClasess;
