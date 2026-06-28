import React, { useEffect, useState } from "react";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { useTranslation } from "react-i18next";
import student_Page_Function from "../service/student";
function ArchiveStudents() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUserArchived();
  }, []);

  const getUserArchived = async () => {
    const response = await student_Page_Function.getArchivedUser();
    setUsers(response);
  };

  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUINoFlex} min-h-96 overflow-scroll p-3`}>
        {users.length === 0 ? (
          <h3 className="flex items-center justify-center">{t('no_date')}</h3>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  <p className="min-w-40">№</p>
                </th>
                <th>
                  <p className="min-w-40">
                    {t("firstName")} {t("lastName")} {t("patronymic")}
                  </p>
                </th>
                <th>
                  <p className="min-w-28">{t("birthday")}</p>
                </th>
                <th>
                  <p className="min-w-28">{t("phone_number")}</p>
                </th>
                <th>
                  <p className="min-w-28">{t("table_classes")}</p>
                </th>
                <th>
                  <p className="min-w-28">{t("active_table")}</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((item, id) => {
                return (
                  <tr key={item.id}>
                    <td>{id + 1}</td>
                    <td>
                      {item.firstName} {item.lastName} {item.patronymic}
                    </td>
                    <td>{item.birthDate}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item?.grade}</td>
                    <td className="font-bold">
                      <span className="text-red">
                        {item.isActive ? t("active_table") : t("inactive_table")}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ArchiveStudents;
