import { Link, useNavigate } from "react-router-dom";
import { activeEdit, Container, styleTopBarUINoFlex } from "../constanta/style";
import { BUTTON, SEARCH } from "../ui";
import { arrowRight, editBlue, menuDots, trash } from "../icons";
import { showActiveModal } from "../slice/class";
import { useDispatch, useSelector } from "react-redux";

function ListOfClassesID() {
  const navigate = useNavigate()
  const open = useSelector(sel => sel.sidebarReduser.open)
  return (
    <div className={`${Container}`}>
      <div
        className={`${styleTopBarUINoFlex} h-20 w-full px-3 flex items-center justify-between`}
      >
        <div className="tablet:w-1/4">
          <SEARCH />
        </div>
        <div>
          <BUTTON
            buttonFunction={() => {
              navigate("/add-student")
            }}
            name={"O‘quvchi qo‘shish"}
            active
          />
        </div>
      </div>

      <div className={`${styleTopBarUINoFlex} ${open ? 'hidden' : 'block'} min-h-96 overflow-scroll p-3`}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>№</th>
              <th>O‘qituvchi</th>
              <th>Fan</th>
              <th>Tug’ilgan sanasi</th>
              <th>Telefon raqam</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>
                <p className='w-[270px]'>To‘lqin Ziyodullayev</p>
              </td>
              <td>
                <p className='w-[150px]'>Ingliz tili, Rus tili</p>
              </td>
              <td>
                <p className='w-[110px]'>1990-01-01</p>
              </td>
              <td>
                <p className='min-w-max'>+998999999999</p>
              </td>
              <td>
                <div className='w-[150px] flex items-center justify-between relative'>
                  <Link to={''} className='flex items-center justify-center gap-2 no-underline'>Batafsil <img src={arrowRight} alt="" /></Link>
                  <div className="dropdown">
                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false"><img src={menuDots} width={25} className=' p-1' alt="menuDots" /></button>
                    <div className={`dropdown-menu`}>
                      <button className='dropdown-item d-flex align-items-center  gap-2 border-b border-brGray'><img src={editBlue} width={18} alt="editBlue" />Tahrirlash</button>
                      <button className='dropdown-item d-flex align-items-center gap-2'><img src={trash} width={20} alt="trash" />O‘chirish</button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListOfClassesID;
