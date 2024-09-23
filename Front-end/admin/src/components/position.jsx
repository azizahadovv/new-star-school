import * as React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import teacherController from "../service/teacher";
import { useTranslation } from "react-i18next";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { WINNER } from "../icons";
import Rodal from "rodal";

const animatedComponents = makeAnimated();

const DEFAULT_ROLES = [
  "TEACHER",
  "DIRECTOR",
  "ADMIN",
  "DEPUTY_DIRECTOR",
];

function Position() {
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const [userRoles, setUserRoles] = React.useState([]);
  const [useName, setUseName] = React.useState("");
  const [Ids, setIds] = React.useState("");

  React.useEffect(() => {
    getUsersData();
    const options = transformToOptions(DEFAULT_ROLES);
    setUserRoles(options);
  }, [Ids, selectedValues]);

  const getUsersData = async () => {
    const data = await teacherController.getTeacher();
    setAllUsers(data);
  };

  const fetchUserRoles = async (name, ids) => {
    setUseName(name);
    setIds(ids);
    const datas = await teacherController.getTeacherInId(ids);
    const userRoles = datas.roles;
    setSelectedValues(userRoles);
    setVisible(true);
  };

  const transformToOptions = (roles) =>
    roles.map((role) => ({ value: role, label: capitalize(role) }));

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleSelectChange = (options) => {
    const values = options ? options.map((opt) => opt.value) : [];
    setSelectedValues(values);
  };

  const saveUserDatas = async () => {
    await teacherController.changePositionTeacher(Ids, selectedValues);
    setVisible(false);
    getUsersData();
  };

  console.log(selectedValues);

  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUINoFlex}`}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>{t("№")}</th>
              <th>{t("firstName") + " " + t("lastName")}</th>
              <th>{t("phone_number")}</th>
              <th>{t("active_table")}</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, id) => {
              return (
                <tr key={user.id}>
                  <td>{id + 1}</td>
                  <td>{user.firstName + " " + user.lastName}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    <button
                      onClick={() =>
                        fetchUserRoles(
                          user.firstName + " " + user.lastName,
                          user.id
                        )
                      }
                      className="btn btn-secondary"
                    >
                      <img width={20} src={WINNER} alt="" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Rodal
        height={250}
        visible={visible}
        onClose={() => setVisible(!visible)}
      >
        <div className="flex flex-col items-stretch justify-between w-full h-full">
          <h3>{useName}</h3>
          <Select
            value={userRoles.filter((opt) =>
              selectedValues.includes(opt.value)
            )}
            onChange={handleSelectChange}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={userRoles}
          />
          <button onClick={saveUserDatas} className="btn btn-success">
            {t("save")}
          </button>
        </div>
      </Rodal>
    </div>
  );
}

export default Position;
