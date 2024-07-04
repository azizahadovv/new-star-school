import { Link } from "react-router-dom"
import { IconDark } from "../icons"
import { BUTTON, INPUT } from "../ui"

function Register() {
  return (
    <div className=" w-full h-screen flex items-center justify-center  ">
      <div className="w-[450px] min-h-[420px] px-4 py-10 rounded-lg flex  justify-center flex-col items-stretch gap-3 hexbgshadow">
        <div className="w-full flex items-center justify-center">
          <img className="w-1/3" src={IconDark} alt="" />
        </div>
        <div>
          <INPUT titleInp={'Login'} width={'100%'} typeINP={'text'} placeholder={'305000000000'} />
          <INPUT titleInp={'Parol'} width={'100%'} typeINP={'password'} placeholder={'*****'} />
          <div className="flex items-center justify-between">
            <label className="flex items-center justify-start gap-2">
              <input type="checkbox" name="" id="" />
              <span>Eslab qolish</span>
            </label>
            <Link>Parolni unutdingizmi?</Link>
          </div>
        </div>
        <div className="w-full">
          <BUTTON name={"Kirish"} />
        </div>
      </div>
    </div>
  )
}

export default Register