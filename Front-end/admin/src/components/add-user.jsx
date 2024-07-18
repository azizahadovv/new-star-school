import React from "react";
import {
  Container,
  INPUT_CLASSES,
  styleTopBarUINoFlex,
} from "../constanta/style";
import { Autocomplete, TextField } from "@mui/material";
import { BUTTON } from "../ui";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AddUser() {
  const navigate=useNavigate()
  const open = useSelector(sel => sel.sidebarReduser.open)

  return (
    <div className={`${Container}`}>
      <div
        className={`${styleTopBarUINoFlex} ${open ? 'hidden' : 'flex'} min-h-96 overflow-scroll p-3 items-start content-start justify-start flex-wrap gap-5`}
      >
        <TextField
          required
          placeholder="Kiriting"
          label="Ism"
          sx={INPUT_CLASSES}
        />
        <TextField
          required
          placeholder="Kiriting"
          label="Familiya"
          sx={INPUT_CLASSES}
        />
        <TextField
          required
          placeholder="Kiriting"
          label="Otasining ismi"
          sx={INPUT_CLASSES}
        />
        <TextField
          required
          type="date"
          label="Tug‘ilgan sanasi"
          sx={INPUT_CLASSES}
        />
        <select
          required
          class="form-select"
          style={{ height: "55px", maxWidth: "350px" }}
          aria-label="Default select example"
        >
          <option selected hidden>
            Gender *
          </option>
          <option value="men">Erkak</option>
          <option value="women">Ayol</option>
        </select>
        <select
          required
          class="form-select"
          style={{ height: "55px", maxWidth: "350px" }}
          aria-label="Default select example"
        >
          <option selected hidden>
            Millati *
          </option>
          <option value="uzbek">O'zbek</option>
          <option value="rus">Rus</option>
          <option value="tojik">Tojik</option>
        </select>
        <div className="w-full h-[1px] bg-brGray"></div>
        <select
          required
          class="form-select"
          style={{ height: "55px", maxWidth: "350px" }}
          aria-label="Default select example"
        >
          <option selected hidden>
            Davlat *
          </option>
          <option value="uzbekistan">O'zbekiston</option>
          <option value="rossiya">Rossiya</option>
        </select>
        <select
          required
          class="form-select"
          style={{ height: "55px", maxWidth: "350px" }}
          aria-label="Default select example"
        >
          <option selected hidden>
            Viloyat *
          </option>
          {/* <option value="Andijon">Andijon viloyati</option> */}
          <option value="Buxoro">Buxoro viloyati</option>
          {/* <option value="Fargʻona">Fargʻona viloyati</option>
          <option value="Jizzax">Jizzax viloyati</option>
          <option value="Xorazm">Xorazm viloyati</option>
          <option value="Namangan">Namangan viloyati</option>
          <option value="Navoiy">Navoiy viloyati</option>
          <option value="Qashqadaryo">Qashqadaryo viloyati</option>
          <option value="Samarqand">Samarqand viloyati</option>
          <option value="Sirdaryo">Sirdaryo viloyati</option>
          <option value="Surxondaryo">Surxondaryo viloyati</option>
          <option value="Toshkent">Toshkent viloyati</option> */}
        </select>
        <TextField
          required
          placeholder="Kiriting"
          label="Uy manzili"
          sx={INPUT_CLASSES}
        />
        <TextField
          type="number"
          required
          placeholder="Kiriting"
          label="Telefon raqam"
          sx={INPUT_CLASSES}
        />
        <TextField
          required
          placeholder="Kiriting"
          label="Login"
          sx={INPUT_CLASSES}
        />
        <TextField
          required
          type="password"
          placeholder="Kiriting"
          label="Parol"
          sx={INPUT_CLASSES}
        />
        <label>
          <input type="file" />
        </label>
       
        <div>
        
        <BUTTON buttonFunction={()=>(navigate(-1))} active name={'Saqlash'} />
        </div>
      </div>
    </div>
  );
}

export default AddUser;
