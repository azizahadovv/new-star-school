import axios from "./api";

const teacherControllers = {
  async getTeachersData() {
    const { data } = await axios.get("teachers");
    return data;
  },
  async getDataTeacherInId(teacherId) {
    try {
      const { data } = await axios.get(`teachers/${teacherId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async getTeachersDataInData(teacherData) {
    try {
      const { data } = await axios.get(`teachers/search?name=${teacherData}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default teacherControllers;
