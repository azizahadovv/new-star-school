import React from "react";
import { Container, styleTopBarUINoFlex2 } from "../constanta/style";
import { useSelector } from "react-redux";
import { homeCard } from "../constanta/const";
import { Link } from "react-router-dom";

function Home() {
  const open = useSelector((sel) => sel.sidebarReduser.open);
  return (
    <div
      className={`p-6 min-h-[360px] rounded-lg ${Container} ${open ? "hidden" : "flex"
        }`}
    >
      <div className="flex tablet:items-start minMobil:items-center tablet:justify-start minMobil:justify-center gap-5 flex-wrap">
        {
          homeCard.map((item) => {
            return (
              <Link to={item.link} key={item.id} className={`${styleTopBarUINoFlex2} flex items-center hoverClass flex-col no-underline justify-center flex-wrap minMobil:w-full mobil:w-72 h-72 rounded-3xl gap-5  `}>
                <img className="rounded-lg" width={120} height={120} src={item.img} alt="item.img" />
                <h3 className="text-textBlack text-center">{item.title}</h3>
              </Link>
            )
          })
        }
      </div>
    </div>
  );
}

export default Home;
