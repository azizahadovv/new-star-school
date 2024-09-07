import { Link, useNavigate } from "react-router-dom";
import { IconLight } from "../icons";
import { BUTTON, INPUT } from "../ui";
import { useEffect, useState } from "react";
import student_register from "../service/register";
import { toast } from "react-toastify"; // For notifications
function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Sahifa yuklangan vaqtda sessionStorage ni tozalash
    sessionStorage.clear();
  }, []);

  const submitButton = async () => {
    try {
      const data = await student_register.registerStudent({ username, password });

      const roles = data.roles || [];

      // Token borligini tekshirish
      if (data?.jwtToken) {
        // Rollarni tekshirish
        if (roles.includes('ADMIN')) {
          toast.error("Siz Admin platformasiga kirishingiz kerak!");
          // Admin uchun amallarni bu yerda bajarishingiz mumkin
        }
        if (roles.includes('TEACHER')) {
          localStorage.setItem('jwtToken', data.jwtToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          sessionStorage.setItem('my-users-ids', data.userId);
          toast.success("Teacher foydalanuvchisi");
          navigate('/');
          
          // O'qituvchi uchun amallarni bu yerda bajarishingiz mumkin
        }
        if (roles.includes('DEPUTY_DIRECTOR')) {
          toast.error("Siz direktor o‘rinbosari platformasiga kirishingiz kerak!");
          // O'qituvchi uchun amallarni bu yerda bajarishingiz mumkin
        }
        if (roles.includes('DIRECTOR')) {
          toast.error("Siz direktor platformasiga kirishingiz kerak!");
          // O'qituvchi uchun amallarni bu yerda bajarishingiz mumkin
        }
        if (roles.includes('STUDENT')) {
          toast.error("Siz O‘quvchi platformasiga kirishingiz kerak!");
          // O'qituvchi uchun amallarni bu yerda bajarishingiz mumkin
        }

      } else {
        console.log("Failed to retrieve JWT token.");
      }
    } catch (error) {
      console.error("Registration failed: ", error);
      // toast.error("Registration failed. Please try again.");
    }
  };


  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="tablet:max-w-[550px] minMobil:w-full min-h-[420px] px-4 py-10 flex justify-center flex-col gap-3">
        <div className="flex items-center justify-center w-full h-36 rounded-2xl border-t-8 border-darkGray registerShadow-top">
          <img className="w-1/3" src={IconLight} alt="" />
        </div>
        <div className="registerShadow-bottom tablet:p-4 minMobil:p-2 flex flex-col justify-center items-stretch gap-4">
          <div className="w-full flex flex-col items-start justify-center">
            <span className="leading-8 tablet:text-2xl minMobil:text-xl font-bold text-textBlack">Shaxsiy akkauntga kirish</span>
            <span className="leading-8 tablet:text-base minMobil:text-sm font-normal text-textGray">Kirish uchun shaxsiy ma’lumotlarini kiriting</span>
          </div>
          <div>
            <INPUT
              value={username}
              setValue={setUsername}
              titleInp="Login"
              width="100%"
              typeINP="text"
              placeholder="305000000000"
            />
            <INPUT
              value={password}
              setValue={setPassword}
              titleInp="Parol"
              width="100%"
              typeINP="password"
              placeholder="*****"
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center justify-start gap-2">
                <input id="checkbox_id" type="checkbox" />
                <span className="minMobil:text-sm tablet:text-base">Eslab qolish</span>
              </label>
              <a href="#" className="minMobil:text-sm tablet:text-base text-red no-underline font-semibold">
                Parolni unutdingizmi?
              </a>
            </div>
          </div>
          <div className="w-full">
            <BUTTON buttonFunction={() => submitButton()} name="Kirish" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;