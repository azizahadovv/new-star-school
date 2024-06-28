import { Link, useNavigate } from "react-router-dom"
import { IconDark } from "../icons"
import { BUTTON, INPUT } from "../ui"
import { useDispatch } from "react-redux"
import { registerBtn } from "../slice/register"
function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className=" w-full h-[100vh] flex items-center justify-center fixed top-0 bg-white">
      <div className="tablet:w-[450px] minMobil:w-full min-h-[420px] px-4 py-10 rounded-lg flex  justify-center flex-col items-stretch gap-3 hexbgshadow">
        <div className="w-full flex items-center justify-center">
          <img className="w-1/3" src={IconDark} alt="" />
        </div>
        <div>
          <INPUT titleInp={'Login'} width={'100%'} typeINP={'text'} placeholder={'305000000000'} />
          <INPUT titleInp={'Parol'} width={'100%'} typeINP={'password'} placeholder={'*****'} />
          <div className="flex items-center justify-between">
            <label className="flex items-center justify-start gap-2">
              <input id="checkbox_id" type="checkbox" />
              <span>Eslab qolish</span>
            </label>
            <Link>Parolni unutdingizmi?</Link>
          </div>
        </div>
        <div onClick={() => {
          navigate('/')
          dispatch(registerBtn())
        }}
          className="w-full"
        >
          <BUTTON name={"Kirish"} />
        </div>
      </div>
    </div>
  )
}

export default Register