import axios from "axios";
import { baseURL } from "./api";
import { toast } from "react-toastify";
const functionsClasses = {
  async getClasses() {
    try {
      const { data } = await axios.get(`${baseURL}/classes`);
      return data;
    } catch (error) {
      toast.error(error.message)
    }
  },
  async classPostData(dataPost) {
    try {
      const { data } = await axios.post(`${baseURL}/classes`, dataPost);
      return data;
    } catch (error) {
      toast.error(error.message)
    }
  },
  async removeClass(id) {
    try {
      await axios.delete(`${baseURL}/classes/${id}`);
    } catch (error) {
      toast.error(error.message)
    }
  },
  async changeClassName(id, data) {
    try {
      await axios.put(`${baseURL}/classes/${id}`, data);
    } catch (error) {
      toast.error(error.message)
    }
  }

};
export default functionsClasses;
