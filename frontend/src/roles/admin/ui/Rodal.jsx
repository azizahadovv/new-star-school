import React, { useTransition } from 'react'
import Rodal from "rodal";
import { BUTTON, GENDER, INPUT, NATIONALITY } from '.';
import { INPUT_CLASSES, flex, styleTopBarUINoFlex } from '../constanta/style';
import { TextField } from '@mui/material';


function Modal({ modal, setModal }) {
    const { t } = useTransition()


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



    return (
        <Rodal height={660} width={800} visible={modal} onClose={() => setModal(!modal)}>
            <div
                className={`${styleTopBarUINoFlex} ${"flex"
                    } min-h-96 overflow-scroll p-3 content-start ${flex}`}
            >
                <div className={`${flex}`}>
                    <TextField
                        value={firstName}
                        onChange={(e) => setfirstName(e.target.value)}
                        required
                        // placeholder={t("enter")}
                        //  label={t("firstName")}
                        sx={INPUT_CLASSES}
                    />
                    <TextField
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        // placeholder={t("enter")}
                        //  label={t("lastName")}
                        sx={INPUT_CLASSES}
                    />
                    <TextField
                        value={patronymic}
                        onChange={(e) => setPatronymic(e.target.value)}
                        required
                        // placeholder={t("enter")}
                        //  label={t("patronymic")}
                        sx={INPUT_CLASSES}
                    />
                    <TextField
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                        type="date"
                        //  label={t("birthday")}
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
                        // placeholder={t("enter")}
                        //  label={t("state")}
                        sx={INPUT_CLASSES}
                    />
                    <TextField
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        required
                        // placeholder={t("enter")}
                        //  label={t("province")}
                        sx={INPUT_CLASSES}
                    />
                    <TextField
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        required
                        // placeholder={t("enter")}
                        //  label={t("district")}
                        sx={INPUT_CLASSES}
                    />
                    <TextField
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        // placeholder={t("enter")}
                        //  label={t("home_address")}
                        sx={INPUT_CLASSES}
                    />
                </div>
                <div className={`${flex} pb-5 border-b border-brGray`}>
                    <TextField
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        type="tel"
                        required
                        // placeholder={t("enter")}
                        //  label={t("phone_number")}
                        sx={INPUT_CLASSES}
                    />
                    <TextField
                        value={parentPhoneNumber}
                        onChange={(e) => setParentPhoneNumber(e.target.value)}
                        type="tel"
                        required
                        // placeholder={t("enter")}
                        //  label={t("additional_phone_number")}
                        sx={INPUT_CLASSES}
                    />
                    <TextField
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                        // placeholder={t("enter")}
                        //  label={t("login")}
                        sx={INPUT_CLASSES}
                    />
                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        type="password"
                        // placeholder={t("enter")}
                        //  label={t("password")}
                        sx={INPUT_CLASSES}
                    />
                </div>
                <div>
                    {/* <BUTTON buttonFunction={() => saveDataTeacher(subjectTeacherId)} active name={t("save")} /> */}
                </div>
            </div>

        </Rodal>
    )
}

export default Modal