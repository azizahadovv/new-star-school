import axios from "axios";
import { baseURL } from "./api";
const functionsClasses = {
  async getClasses() {
    const { data } = await axios.get(`${baseURL}/classes`);
    return data;
  },
  async classPostData(dataPost) {
    const { data } = await axios.post(`${baseURL}/classes`, dataPost);
    return data;
  },
  async removeClass(id) {
    await axios.delete(`${baseURL}/classes/${id}`);
    return "Class deleted successfully";
  },
  async changeClassName(id, data) {
    await axios.put(`${baseURL}/classes/${id}`, data);
    return;
  }

};
export default functionsClasses;
