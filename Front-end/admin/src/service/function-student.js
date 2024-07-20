import axios from "axios";
import { baseURL } from "./api";

const studentFunction = {
  async studentPostData(classId, data) {
    const { datas } = await axios.post(
      `${baseURL}/classes/${classId}/students`,
      data
    );
    return datas;
  },
  async getStudent() {
    const x = localStorage.getItem("ClassId");
    try {
      const { data } = await axios.get(`${baseURL}/classes/` + x);
      return data;
    } catch (error) {
      console.log("Error getting student axios data");
    }
  },
  async studentPutActie(id, dataActive) {
    const { data } = await axios.put(`${baseURL}/students/${id}`, dataActive);
    return data;
  },
  async studentDeleteActie(id) {
    const { data } = await axios.delete(`${baseURL}/students/${id}`);
    return data;
  },
};

export default studentFunction;
