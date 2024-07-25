import * as React from "react";
import {
  Container,
  INPUT_CLASSES,
  flex,
  styleTopBarUINoFlex,
} from "../constanta/style";
import { TextField } from "@mui/material";
import { BUTTON } from "../ui";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { file, img } from "../icons";
import { getLocalData } from "../service/local-data";
import studentFunction from "../service/function-class-student";
import { ToastContainer, toast } from "react-toastify";

function AddUser() {
  const navigate = useNavigate();
  const open = useSelector((sel) => sel.sidebarReduser.open);
  const [firstName, setfirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [patronymic, setPatronymic] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [nationality, setNationality] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [parentPhoneNumber, setParentPhoneNumber] = React.useState("");
  const id = localStorage.getItem('ClassId')
  // const [image, setImage] = React.useState("");
  const check =
    firstName &&
    lastName &&
    patronymic &&
    birthDate &&
    gender &&
    nationality &&
    country &&
    region &&
    district &&
    address &&
    phoneNumber &&
    login &&
    password &&
    parentPhoneNumber
  // image;
  const obJData = {
    firstName: firstName,
    lastName: lastName,
    patronymic: patronymic,
    birthDate: birthDate,
    gender: gender,
    nationality: nationality,
    country: country,
    region: district,
    district: district,
    address: address,
    phoneNumber: phoneNumber,
    login: login,
    password: password,
    parentPhoneNumber: parentPhoneNumber,
  }
  const excelUpload = async (e) => {
    const formData = new FormData();
    formData.append('file', e);
    try {
      await studentFunction.studentPostCSV(id, formData)
      toast.success("Students added via excel file have been added successfully")
      navigate(-1)
    } catch (error) {
      toast.error("Error Image" + error)
    }
  }
  const AddStudent = async () => {
    try {
      if (check) {
        await studentFunction.studentPostData(id, obJData)
        toast.success("Student Success")
        navigate(-1)
      } else {
        toast.info("Please fill in all lines")
      }
    } catch (error) {
      toast.error("Error")
    }
  };
  return (
    <div className={`${Container}`}>

      <div className={`${styleTopBarUINoFlex} min-h-20 flex items-center justify-start px-3`}>
        <div className="min-w-[150px]">
          <BUTTON buttonFunction={() => navigate(-1)} active name={"ortga"} />
        </div>
      </div>
      <div
        className={`${styleTopBarUINoFlex} ${open ? "hidden" : "flex"
          } min-h-96 overflow-scroll p-3 content-start ${flex}`}
      >
        <div className="flex flex-col items-center justify-between bg-border-color border-2 w-56 h-60 bg-lightGray">
          <a title="O'quvchilarni excel file orqali yuklash uchun namuna"
            href="../src/icons/arrow.svg"
            download="google.svg"
            className="h-25 flex items-center text-sm border-b "
          >
            Namuna Shablon yuklab olish
          </a>
          <label title="O'quvchilarni excel file orqali qo'shish" className="w-full h-75 p-3 cursor-pointer">
            <div className="flex flex-col gap-2 items-center justify-center">
              <img src={file} width={35} alt="img" />
              <span className="text-sm capitalize text-textGray font-normal leading-5">
                Fayl yuklang
              </span>
            </div>
            <input onChange={(e) => (excelUpload(e.target.files[0]))} hidden type="file" />
          </label>
        </div>
        <div className={`${flex}`}>
          <TextField
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            required
            placeholder="Kiriting"
            label="Ism"
            sx={INPUT_CLASSES}
          />
          <TextField
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Kiriting"
            label="Familiya"
            sx={INPUT_CLASSES}
          />
          <TextField
            value={patronymic}
            onChange={(e) => setPatronymic(e.target.value)}
            required
            placeholder="Kiriting"
            label="Otasining ismi"
            sx={INPUT_CLASSES}
          />
          <TextField
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
            type="date"
            label="Tug‘ilgan sanasi"
            sx={INPUT_CLASSES}
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="form-select"
            style={{ height: "55px", maxWidth: "350px" }}
            aria-label="Default select example"
          >
            <option value="" hidden>
              Gender *
            </option>
            <option value="male">Erkak</option>
            <option value="female">Ayol</option>
          </select>

          <select
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            required
            className="form-select"
            style={{ height: "55px", maxWidth: "350px" }}
            aria-label="Default select example"
          >
            <option hidden>
              Millati *
            </option>
            <option value="uzbek">O'zbek</option>
            <option value="rus">Rus</option>
          </select>
        </div>
        <div className="w-full h-[1px] bg-brGray"></div>
        <div className={`${flex}`}>
          <TextField
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            placeholder="Kiriting"
            label="Davlat"
            sx={INPUT_CLASSES}
          />
          <TextField
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
            placeholder="Kiriting"
            label="Viloyat"
            sx={INPUT_CLASSES}
          />
          <TextField
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
            placeholder="Kiriting"
            label="Tuman"
            sx={INPUT_CLASSES}
          />
          <TextField
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Kiriting"
            label="Uy manzili"
            sx={INPUT_CLASSES}
          />
          <TextField
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="number"
            required
            placeholder="Kiriting"
            label="Telefon raqam"
            sx={INPUT_CLASSES}
          />
          <TextField
            value={parentPhoneNumber}
            onChange={(e) => setParentPhoneNumber(e.target.value)}
            type="number"
            required
            placeholder="Kiriting"
            label="Qo'shimcha telefon raqam"
            sx={INPUT_CLASSES}
          />
          <TextField
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            placeholder="Kiriting"
            label="Login"
            sx={INPUT_CLASSES}
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Kiriting"
            label="Parol"
            sx={INPUT_CLASSES}
          />
        </div>
        <div>
          <BUTTON buttonFunction={AddStudent} active name={"Saqlash"} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddUser;
