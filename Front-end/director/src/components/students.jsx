import { useEffect, useState } from "react";
import {
  Container,
  styleTopBarUI,
  styleTopBarUINoFlex,
} from "../constanta/style";
import { LOADER, SEARCH } from "../ui";
import { ARROW } from "../icons";
import { useNavigate } from "react-router-dom";
import studentsController from "../service/student";
function Students() {
  const navigate = useNavigate();
  const [dataStudents, setDataStudents] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    const res = await studentsController.getStudentsData();
    setDataStudents(res);
  };

  const searcheStudent = async (e) => {
    setSearchValue(e);
    if (searchValue.trim() === "") {
      getStudents();
      return;
    }
    try {
      const res = await studentsController.searchStudent(e);
      setDataStudents(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={Container}>
      <div className={`${styleTopBarUI} min-h-20 px-3`}>
        <SEARCH
          value={searchValue}
          setValue={searcheStudent}
          placeholder={"FISH bo'yicha qidiruv"}
        />
      </div>
      <div className={`${styleTopBarUINoFlex} min-h-96 overflow-scroll px-3 `}>
        {!dataStudents ? (
          <div className="flex items-center justify-center min-h-40 w-full  my-5">
            <LOADER />
          </div>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>№</th>
                <th>O‘quvchi</th>
                <th>Sinf</th>
                <th>Tug’ilgan sanasi</th>
                <th>Telefon raqam</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataStudents.map((item, id) => {
                return (
                  <tr key={id}>
                    <th scope="row" key={item.id}>
                      {id + 1}
                    </th>
                    <td>
                      <p className="w-[270px] flex items-center justify-start gap-2">
                        <img
                          hidden={!item.image}
                          className="w-10 h-10 rounded-full"
                          src={item.image}
                          alt="##"
                        />
                        {item.firstName +
                          " " +
                          item.lastName +
                          " " +
                          item.patronymic}
                      </p>
                    </td>
                    <td>
                      <p className="w-[150px]">{item.grade}</p>
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
                          onClick={() => navigate(`${item.id}`)}
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

export default Students;
