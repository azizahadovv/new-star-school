import { toast } from "react-toastify";
import axios from "./api";

const auth = {
  headers: {
    accept: "*/*",
    Authorization: " " + "Bearer " + localStorage.getItem("jwtToken"),
  },
};

const Admin_user = {
  async getUserData(userId) {
    await axios
      .get(`v1/admins/archived`, auth)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        toast.error(error?.message);
        throw error; // Optional: re-throw the error if you want the caller to handle it
      });
  },
  // async uploadImg(studentId, file) {
  //     try {
  //         await axios.post(`v1/admins/${studentId}/upload-image`, file, auth)
  //         toast.success('Image uploaded successfully')
  //     } catch (error) {
  //         toast.error(error?.message)
  //     }
  // }
};

export default Admin_user;
