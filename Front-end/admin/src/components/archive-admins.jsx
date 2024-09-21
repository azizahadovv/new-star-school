import React, { useEffect } from "react";
import Admin_user from "../service/admin";
import { Container, styleTopBarUINoFlex } from "../constanta/style";

function ArchiveAdmins() {
  useEffect(() => {
    getAdminaArchive();
  }, []);

  const getAdminaArchive = async () => {
    const archive = await Admin_user.getUserData();
    console.log(archive);
  };

  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUINoFlex} min-h-96`}></div>
    </div>
  );
}

export default ArchiveAdmins;
