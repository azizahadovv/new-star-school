import axios from "./api"
import { toast } from "react-toastify";


const auth = {
  headers: {
    'accept': '*/*',
    'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
  }
}


const studentFunction = {
  async studentPostData(classId, data) {
    const { datas } = await axios.post(
      `classes/${classId}/students`,
      data, auth
    );
    return datas;
  },
  async studentPostCSV(classId, data) {
    try {
      const { datas } = await axios.post(
        `classes/${classId}/students/csv`,
        data, auth
      );
      return datas;
    } catch (error) {
      toast.error(error.message)
    }
  },

  async removeStudent(studentId) {
    try {
      await axios.delete(`students/${studentId}`, auth);
    } catch (error) {
      toast.error(error.message)
    }
  },
  async getStudent() {
    const x = localStorage.getItem("ClassId");
    try {
      const { data } = await axios.get(`classes/` + x, auth);
      return data;
    } catch (error) {
      toast.error(error.message)
    }
  },
  async studentPutActie(id, dataActive) {
    try {
      const { data } = await axios.put(`students/${id}`, dataActive, auth);
      return data;
    } catch (error) {
      toast.error(error.message)
    }
  },
  async studentDeleteActie(id) {
    try {
      const { data } = await axios.delete(`students/${id}`, auth);
      return data;
    } catch (error) {
      toast.error(error.message)

    }
  },
  async removeStudentInClass(studentId, classId) {
    try {
      await axios.delete(`classes/${classId}/students/${studentId}`, auth);
      return "Students removed successfully";
    } catch (error) {
      toast.error(error.message)
    }
  },
};

export default studentFunction;
