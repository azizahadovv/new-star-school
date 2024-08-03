import { useNavigate } from "react-router-dom";
import {
  Container,
  styleTopBarUI,
  styleTopBarUINoFlex,
} from "../constanta/style";
import { ARROW } from "../icons";
import { LOADER, SEARCH } from "../ui";
import teacherControllers from "../service/teacher";
import { useEffect, useState } from "react";

function Teachers() {
  const navigate = useNavigate();
  const [dataTeachers, setDataTeachers] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    getTeachers();
  }, []);

  const getTeachers = async () => {
    const res = await teacherControllers.getTeachersData();
    setDataTeachers(res);
  };

  const searcheTeacher = async (e) => {
    setSearchValue(e);
    if (searchValue.trim() === "") {
      getTeachers();
      return;
    }
    try {
      const res = await teacherControllers.getTeachersDataInData(e);
      setDataTeachers(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUI} min-h-20 px-4`}>
        <SEARCH
          value={searchValue}
          setValue={searcheTeacher}
          placeholder={"FISH bo‘yicha izlash"}
        />
      </div>
      <div
        className={`min-h-96 overflow-scroll flex flex-col items-start justify-start ${styleTopBarUINoFlex} p-3 overflow-scroll`}
      >
        {!dataTeachers ? (
          <div className="flex items-center justify-center min-h-40 w-full  m-5">
            <LOADER />
          </div>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>№</th>
                <th>O‘qituvchi</th>
                <th>Fan</th>
                <th>Tug’ilgan sanasi</th>
                <th>Telefon raqam</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataTeachers?.map((item, id) => {
                return (
                  <tr key={id}>
                    <th scope="row" key={item.id}>
                      {id + 1}
                    </th>
                    <td>
                      <p className="w-[270px] flex items-center justify-start gap-2">
                        <img
                          className="w-10 h-10 rounded-full"
                          hidden={!item.image}
                          src={item.image && item?.image}
                          alt=""
                        />
                        {item.firstName +
                          " " +
                          item.lastName +
                          " " +
                          item.patronymic}
                      </p>
                    </td>
                    <td>
                      <p className="w-[150px]">
                        {item?.subject.map((i) => i.name)}
                      </p>
                    </td>
                    <td>
                      <p className="w-[110px]">{item.birthDate}</p>
                    </td>
                    <td>
                      <p className="min-w-[85px]">{item.phoneNumber}</p>
                    </td>
                    <td>
                      <div className="w-[150px] flex items-center justify-between relative">
                        <button
                           onClick={() => {
                            navigate(`/teachers/${item?.id}`)
                            localStorage.setItem("TeacherId", item?.id)
                          }}
                          className="flex items-center justify-center gap-2 text-blue"
                        >
                          Batafsil <img width={7} src={ARROW} alt="arrow" />
                        </button>
                      </div>
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

export default Teachers;
