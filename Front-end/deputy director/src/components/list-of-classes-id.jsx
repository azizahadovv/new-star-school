import { useNavigate } from "react-router-dom";
import { Container, styleTopBarUINoFlex } from "../constanta/style";
import { BUTTON, SEARCH } from "../ui";

function ListOfClassesID() {
  const navigate=useNavigate()
  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUINoFlex} h-20 w-full px-3 flex items-center justify-between`}>
        <div className="tablet:w-1/4">
          <SEARCH />
        </div>
        <div>
          <BUTTON buttonFunction={()=>navigate('/add-student')} name={'O‘quvchi qo‘shish'} active/>
        </div>
      </div>
    </div>
  );
}

export default ListOfClassesID;
