import { toast } from "react-toastify";
import axios from "./api";

const auth = {
  headers: {
    accept: "*/*",
    Authorization: " " + "Bearer " + localStorage.getItem("jwtToken"),
  },
};

const lesson_times = {
  async getTimes() {
    try {
      const { data } = await axios.get(`v1/school-time`, auth);
      return data;
    } catch (error) {
      toast.error(error);
      throw error; // Optional: re-throw the error if you want the caller to handle it
    }
  },
  async saveTime(datas) {
    await axios
      .post(`v1/school-time`, datas, auth)
      .then((res) => {
        toast.success("school-time saved", res);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async updateData(id, datas) {
    await axios
      .put(`v1/school-time/${id}`, datas, auth)
      .then((res) => {
        toast.success("school-time saved", res);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async delete(ids) {
    try {
      await axios.delete(`v1/school-time/${ids}`, auth);
      toast.success("Successfully deleted");
    } catch (error) {
      toast.error(error?.message);
    }
  },
};

export default lesson_times;
