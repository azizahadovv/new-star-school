import axios from "axios";
import { baseURL } from "./api";
const functionsClasses = {
  async getClasses() {
    const { data } = await axios.get(`${baseURL}/classes`);
    return data;
  },
  async classPostData(dataPost) {
    const { data } = await axios.post(`${baseURL}/classes`,dataPost);
    return data;
  },
};
export default functionsClasses;
