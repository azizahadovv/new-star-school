

import { toast } from "react-toastify";
import axios from "./api";
const functionsClasses = {
  async getClasses() {
    try {
      const { data } = await axios.get(`classes`);
      return data;
    } catch (error) {
      toast.error(error.message)
    }
  },
  async classPostData(dataPost) {
    try {
      const { data } = await axios.post(`classes`, dataPost);
      return data;
    } catch (error) {
      toast.error(error.message)
    }
  },
  async removeClass(id) {
    try {
      await axios.delete(`classes/${id}`);
      return "Class deleted successfully";
    } catch (error) {
      toast.error(error.message)
    }
  },
  async changeClassName(id, data) {
    try {
      await axios.put(`classes/${id}`, data);
      return;
    } catch (error) {
      toast.error(error.message)
    }
  }

};
export default functionsClasses;
