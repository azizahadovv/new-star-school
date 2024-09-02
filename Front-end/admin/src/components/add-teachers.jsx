import * as React from "react";
import { TextField } from '@mui/material'
import { Container, INPUT_CLASSES, flex, styleTopBarUINoFlex } from '../constanta/style'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { BUTTON, GENDER, LEVEL, NATIONALITY, SUBJECTTEACHER } from "../ui";
import { ToastContainer, toast } from "react-toastify";
import subjectFunction from "../service/subjects";
import teacherController from "../service/teacher";
import { useTranslation } from "react-i18next";

function AddTeacher() {
  const {t}=useTranslation()
  const [subjectList, setSubjectList] = React.useState([])
  const navigate = useNavigate();
  const open = useSelector((sel) => sel.sidebarReduser.open);
  const { id } = useParams()
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
  const [level, setLevel] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [subjectTeacherId, setSubjectTeacherId] = React.useState('');
  const [parentPhoneNumber, setParentPhoneNumber] = React.useState("");

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

  const objectData = {
    firstName: firstName,
    lastName: lastName,
    patronymic: patronymic,
    birthDate: birthDate,
    gender: gender,
    nationality: nationality,
    country: country,
    region: region,
    district: district,
    address: address,
    phoneNumber: phoneNumber,
    login: login,
    password: password,
    parentPhoneNumber: parentPhoneNumber,
  }
  React.useEffect(() => {
    getSubjectFunction()
    changeuserDataTeacher()
  }, [])
  const getSubjectFunction = async () => {
    const response = await subjectFunction.getSubjects()
    setSubjectList(response)
  }
  const saveDataTeacher = async () => {
    if (check) {
      try {
        if (id === undefined) {
          await teacherController.postTeacherInSubjectId(subjectTeacherId,objectData,level)
          toast.success("Teacher successfully created");
          navigate(-1);
        } else {
          await teacherController.putTeacher(id, subjectTeacherId, objectData)
          toast.success("success updateTeacher");
          navigate(-1)
        }
      } catch (error) {
        console.log(`Error add teacher line 38: ${error}`);
      }
    } else {
      toast.error(`Please fill in all lines`)
    }
  };

  const changeuserDataTeacher = async () => {
    if (id) {
      try {
        const response = await teacherController.getTeacherInId(id)
        setfirstName(response.firstName)
        setLastName(response.lastName)
        setPatronymic(response.patronymic)
        setBirthDate(response.birthDate)
        setGender(response.gender)
        setNationality(response.nationality)
        setCountry(response.country)
        setRegion(response.region)
        setDistrict(response.district)
        setAddress(response.address)
        setPhoneNumber(response.phoneNumber)
        setLogin(response.login)
        setPassword(response.password)
        setParentPhoneNumber(response.parentPhoneNumber)
        setSubjectTeacherId(response.subjectId)
      } catch (error) {
        navigate(-2)
        console.log(`Error get teacher by id line 126: ${error}`);
      }
    }
    else {
      console.log("no update request");
    }
  }



  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUINoFlex} min-h-20 flex items-center justify-start  px-3`}>
      </div>
      <div
        className={`${styleTopBarUINoFlex} ${open ? "hidden" : "flex"
          } min-h-96 overflow-scroll p-3 content-start ${flex}`}
      >
        <div className={`${flex}`}>
          <TextField
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            required
            placeholder={t("enter")}
            label={t("firstName")}
            sx={INPUT_CLASSES}
          />
          <TextField
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder={t("enter")}
            label={t("lastName")}
            sx={INPUT_CLASSES}
          />
          <TextField
            value={patronymic}
            onChange={(e) => setPatronymic(e.target.value)}
            required
            placeholder={t("enter")}
            label={t("patronymic")}
            sx={INPUT_CLASSES}
          />
          <TextField
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
            type="date"
            label={t("birthday")}
            sx={INPUT_CLASSES}
          />
          <GENDER gender={gender} setGender={setGender} />

          <NATIONALITY nationality={nationality} setNationality={setNationality} />
        </div>
        <div className="w-full h-[1px] bg-brGray"></div>
        <div className={`${flex} pb-5 border-b border-brGray`}>
          <TextField
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            placeholder={t("enter")}
            label={t("state")}
            sx={INPUT_CLASSES}
          />
          <TextField
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
            placeholder={t("enter")}
            label={t("province")}
            sx={INPUT_CLASSES}
          />
          <TextField
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
            placeholder={t("enter")}
            label={t("district")}
            sx={INPUT_CLASSES}
          />
          <TextField
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder={t("enter")}
            label={t("home_address")}
            sx={INPUT_CLASSES}
          />
          <LEVEL level={level} setLevel={setLevel} />
          <SUBJECTTEACHER subjectList={subjectList} setSubjectTeacherId={setSubjectTeacherId} subjectTeacherId={subjectTeacherId} />
        </div>
        <div className={`${flex} pb-5 border-b border-brGray`}>
          <TextField
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="tel"
            required
            placeholder={t("enter")}
            label={t("phone_number")}
            sx={INPUT_CLASSES}
          />
          <TextField
            value={parentPhoneNumber}
            onChange={(e) => setParentPhoneNumber(e.target.value)}
            type="tel"
            required
            placeholder={t("enter")}
            label={t("additional_phone_number")}
            sx={INPUT_CLASSES}
          />
          <TextField
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            placeholder={t("enter")}
            label={t("login")}
            sx={INPUT_CLASSES}
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder={t("enter")}
            label={t("password")}
            sx={INPUT_CLASSES}
          />
        </div>
        <div>
          <BUTTON buttonFunction={() => saveDataTeacher(subjectTeacherId)} active name={t("save")} />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddTeacher