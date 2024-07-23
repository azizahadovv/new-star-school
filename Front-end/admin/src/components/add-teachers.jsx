import * as React from "react";
import { TextField } from '@mui/material'
import { Container, INPUT_CLASSES, flex, styleTopBarUINoFlex } from '../constanta/style'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { BUTTON } from "../ui";
import { ToastContainer } from "react-toastify";
import { ICONIMG } from "../icons";

function AddTeacher() {
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
            href=""
            download="google.svg"
            className="h-25 flex items-center text-sm border-b "
          >
            Namuna Shablon yuklab olish
          </a>
          <label title="O'quvchilarni excel file orqali qo'shish" className="w-full h-75 p-3 cursor-pointer">
            <div className="flex flex-col gap-2 items-center justify-center">
              <img src={ICONIMG} width={35} alt="img" />
              <span className="text-sm capitalize text-textGray font-normal leading-5">
                Fayl yuklang
              </span>
            </div>
            <input onChange={{}} hidden type="file" />
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
          {/* <label className="flex items-center justify-center bg-border-color border-2 w-56 h-60 bg-lightGray">
          <div className="flex flex-col gap-2 items-center justify-center">
            {image ? (
              <img className="w-52 h-56" src={image} alt="image" />
            ) : (
              <>
                <img src={img} alt="img" />
                <span className="text-sm capitalize text-textGray font-normal leading-5">
                  Rasm yuklang
                </span>
              </>
            )}
          </div>
          <input onChange={(e) => getImgBase64(e)} hidden type="file" />
        </label> */}
        </div>
        <div>
          <BUTTON buttonFunction={{}} active name={"Saqlash"} />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddTeacher