import { Link } from "react-router-dom";
import { COACH } from "../icons";

function CardClasess({ slug, nameOfClass = "1-a" }) {
  return (
    <div className="w-[320px] h-20 border-card rounded-lg px-3 py-2 flex grow-effect">
      <Link
        to={slug} className="uppercase no-underline w-full flex flex-col text-blue"
      >
        {nameOfClass} sinf
        <span className="text-textGray font-mono lowercase flex items-start justify-start mt-2 gap-2 text-lg"><img src={COACH} alt="COACH" /> 32 ta o‘quvchi</span>
      </Link>
    </div>
  );
}

export default CardClasess;
