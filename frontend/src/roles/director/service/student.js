import axios from "./api";

const studentsController = {
  async getStudentsData() {
    const { data } = await axios.get("students");
    return data;
  },
  async getStudentInId(id) {
    const { data } = await axios.get(`students/${id}`);
    return data;
  },
  async searchStudent(studentName) {
    try {
      const { data } = await axios.get(
        `students/search-by?name=${studentName}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default studentsController;
