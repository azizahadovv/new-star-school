

import { toast } from "react-toastify";
import axios from "./api";

const studentFunction = {
  async studentPostData(classId, data) {
    const { datas } = await axios.post(
      `classes/${classId}/students`,
      data
    );
    return datas;
  },
  async studentPostCSV(classId, data) {
    try {
      const { datas } = await axios.post(
        `classes/${classId}/students/csv`,
        data
      );
      return datas;
    } catch (error) {
      toast.error("file error" + " " + error);
      
    }
  },

  async removeStudent(studentId) {
    await axios.delete(`students/${studentId}`);
  },
  async getStudent() {
    const x = localStorage.getItem("ClassId");
    try {
      const { data } = await axios.get(`classes/` + x);
      return data;
    } catch (error) {
      toast.error("Error getting student axios data");
    }
  },
  async studentPutActie(id, dataActive) {
    const { data } = await axios.put(`students/${id}`, dataActive);
    return data;
  },
  async studentDeleteActie(id) {
    const { data } = await axios.delete(`students/${id}`);
    return data;
  },
  async removeStudentInClass(studentId, classId) {
    try {
      await axios.delete(`classes/${classId}/students/${studentId}`);
      return "Students removed successfully";
    } catch (error) {
      toast.error("Error axios url \n" + error);
    }
  },
};

export default studentFunction;
