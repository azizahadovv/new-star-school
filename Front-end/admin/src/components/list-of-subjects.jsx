import { useEffect, useState } from "react";
import Rodal from "rodal";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { menuDots } from "../icons";
import { BUTTON, LOADER, SEARCH } from "../ui";
import subjectFunction from "../service/subjects";

function ListOfSubjects() {
  const [subjects, setSubjects] = useState(null);
  useEffect(() => {
    getSubjects();
  }, []);
  const getSubjects = async () => {
    try {
      const subjects = await subjectFunction.getSubjects();
      setSubjects('subjects');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${Container}`}>
      <div
        className={`${styleTopBarUINoFlex} min-h-20 px-3 flex items-center justify-between overflow-scroll`}
      >
        <div className="min-w-[300px]">
          <SEARCH />
        </div>
        <div className="min-w-40">
          <BUTTON name={"Fan qo‘shish"} active />
        </div>
      </div>
      <div className={`${styleTopBarUINoFlex} min-h-96 px-3`}>
        {!subjects ? (
          <div className="flex items-center justify-center py-5">
            <LOADER />
          </div>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>№</th>
                <th>Fanning nomi</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{}</tbody>
          </table>
        )}

        <Rodal></Rodal>
      </div>
    </div>
  );
}

export default ListOfSubjects;
