import React from "react";
import { CARDCLASSES } from "../ui";
import { Container } from "../constanta/style";
import { useSelector } from "react-redux";

function MyClasses() {
  const open = useSelector((sel) => sel.sidebarReduser.open);

  return (
    <div className={`${Container} ${open ? "hidden" : "flex"} flex-wrap gap-4 content-start `}>
      <CARDCLASSES nameOfClass="1" slug={"njasnm-csd-dc-s"} />
      <CARDCLASSES nameOfClass="4" slug={"njasnm-csd-dc-s"} />
      <CARDCLASSES slug={"njasnm-csd-dc-s"} />
      <CARDCLASSES slug={"njasnm-csd-dc-s"} />
      <CARDCLASSES slug={"njasnm-csd-dc-s"} />
      <CARDCLASSES slug={"njasnm-csd-dc-s"} />
      <CARDCLASSES slug={"njasnm-csd-dc-s"} />
      <CARDCLASSES slug={"njasnm-csd-dc-s"} />
      <CARDCLASSES slug={"njasnm-csd-dc-s"} />
    </div>
  );
}

export default MyClasses;
