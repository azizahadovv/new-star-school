import { toast } from 'react-toastify';
import axios from './api'

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
      toast.error(error.response.data.message);
    }
  },

  async removeStudent(studentId) {
    await axios.delete(`students/${studentId}`, auth);
  },
  async getStudent() {
    const x = localStorage.getItem("ClassId");
    try {
      const { data } = await axios.get(`classes/` + x, auth);
      return data;
    } catch (error) {
      toast.error("Error getting student axios data");
    }
  },
  async studentPutActie(id, dataActive) {
    const { data } = await axios.put(`students/${id}`, dataActive, auth);
    return data;
  },
  async studentDeleteActie(id) {
    const { data } = await axios.delete(`students/${id}`);
    return data;
  },
  async removeStudentInClass(studentId, classId, studentName) {
    try {
      await axios.delete(`classes/${classId}/students/${studentId}`, auth);
      toast.success(`Student named ${studentName} was archiving`);
      return
    } catch (error) {
      toast.error("Error axios url \n" + error);
    }
  },
};

export default studentFunction;
