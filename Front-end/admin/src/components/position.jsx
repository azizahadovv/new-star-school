import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import teacherCtrl from "../service/teacher";
import { useTranslation } from "react-i18next";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { WINNER } from "../icons";
import Rodal from "rodal";

const animatedComponents = makeAnimated();
const ROLES = ["TEACHER", "DIRECTOR", "ADMIN", "DEPUTY_DIRECTOR"];

const Position = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selectedVals, setSelectedVals] = useState([]);
  const [users, setUsers] = useState([]);
  const [roleOpts, setRoleOpts] = useState([]);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetchUsers();
    setRoleOpts(formatRoles(ROLES));
  }, [userId, selectedVals]);

  const fetchUsers = async () => setUsers(await teacherCtrl.getTeacher());

  const fetchUserRoles = async (name, id) => {
    setUserName(name);
    setUserId(id);
    const { roles } = await teacherCtrl.getTeacherInId(id);
    setSelectedVals(roles);
    setVisible(true);
  };

  const formatRoles = (roles) =>
    roles.map((r) => ({
      value: r,
      label: capitalize(r),
      isDisabled: r === "TEACHER", // TEACHER rolini o'chirib bo'lmaydi
    }));

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleSelectChange = (opts) => {
    const vals = opts ? opts.map((opt) => opt.value) : [];
    if (!vals.includes("TEACHER") && selectedVals.includes("TEACHER")) {
      vals.push("TEACHER");
    }
    setSelectedVals(vals);
  };

  const saveUserRoles = async () => {
    const roleQuery = selectedVals.map((r) => `role=${r}`).join("&");
    await teacherCtrl.changePositionTeacher(userId, roleQuery);
    setVisible(false);
    fetchUsers();
  };

  return (
    <div className={Container}>
      <div className={styleTopBarUINoFlex}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>{t("№")}</th>
              <th>{`${t("firstName")} ${t("lastName")}`}</th>
              <th>{t("phone_number")}</th>
              <th>{t("active_table")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={u.id}>
                <td>{idx + 1}</td>
                <td>{`${u.firstName} ${u.lastName}`}</td>
                <td>{u.phoneNumber}</td>
                <td>
                  <button
                    onClick={() =>
                      fetchUserRoles(`${u.firstName} ${u.lastName}`, u.id)
                    }
                    className="btn btn-secondary"
                  >
                    <img width={20} src={WINNER} alt="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Rodal
        height={250}
        visible={visible}
        onClose={() => setVisible(!visible)}
        customStyles={{
          closeButton: {
            width: '24px',
            height: '24px',
            fontSize: '14px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }
        }}
      >
        <div className="flex flex-col items-stretch justify-between w-full h-full">
          <h3>{userName}</h3>
          <Select
            value={roleOpts.map((opt) =>
              selectedVals.includes(opt.value)
                ? opt.value === "TEACHER"
                  ? { ...opt, isDisabled: true } // TEACHER o'chirib bo'lmaydi
                  : opt
                : null
            )}
            onChange={handleSelectChange}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={roleOpts}
          />
          <button onClick={saveUserRoles} className="btn btn-success">
            {t("save")}
          </button>
        </div>
      </Rodal>
    </div>
  );
};

export default Position;
