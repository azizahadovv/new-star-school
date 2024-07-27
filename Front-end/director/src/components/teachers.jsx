import { useNavigate } from "react-router-dom"
import { Container, styleTopBarUI, styleTopBarUINoFlex, styleTopBarUINoFlex2 } from "../constanta/style"
import { ARROW } from "../icons"
import { SEARCH } from "../ui"

function Teachers() {
  const navigate = useNavigate()
  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUI} min-h-20 px-4`}>
        <SEARCH placeholder={'FISH bo‘yicha izlash'} />
      </div>
      <div className={`${styleTopBarUINoFlex2} min-h-96 p-3 overflow-scroll flex flex-col items-start justify-start ${styleTopBarUINoFlex} p-3 overflow-scroll`}>
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
            <tr>
              <th scope="row">1</th>
              <td>
                <p className='w-[270px]'>Kamolov Xasan Muhiddin o‘g‘li</p>
              </td>
              <td>
                <p className='w-[150px]'>Ingliz tili, Rus tili</p>
              </td>
              <td>
                <p className='w-[110px]'>05.05.1997</p>
              </td>
              <td>
                <p className='min-w-[85px]'>+998909101215</p>
              </td>
              <td>
                <div className='w-[150px] flex items-center justify-between relative'>
                  <button onClick={() => (navigate('1'))} className="flex items-center justify-center gap-2 text-blue">
                    Batafsil <img width={7} src={ARROW} alt="arrow" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Teachers