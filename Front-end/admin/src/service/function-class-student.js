import axios from "axios";
import { baseURL } from "./api";
import { toast } from "react-toastify";

const studentFunction = {
  async studentPostData(classId, data) {
    const { datas } = await axios.post(
      `${baseURL}/classes/${classId}/students`,
      data
    );
    return datas;
  },
  async studentPostCSV(classId, data) {
    try {
      const { datas } = await axios.post(
        `${baseURL}/classes/${classId}/students/csv`,
        data
      );
      return datas;
    } catch (error) {
      toast.error("file error" + " " + error);
      
    }
  },

  async removeStudent(studentId) {
    await axios.delete(`${baseURL}/students/${studentId}`);
  },
  async getStudent() {
    const x = localStorage.getItem("ClassId");
    try {
      const { data } = await axios.get(`${baseURL}/classes/` + x);
      return data;
    } catch (error) {
      toast.error("Error getting student axios data");
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
  async removeStudentInClass(studentId, classId) {
    try {
      await axios.delete(`${baseURL}/classes/${classId}/students/${studentId}`);
      return "Students removed successfully";
    } catch (error) {
      toast.error("Error axios url \n" + error);
    }
  },
};

export default studentFunction;
