import axios from './api'

const functionsClasses = {
  async getClasses() {
    const { data } = await axios.get(`classes`);
    return data;
  },
  async classPostData(dataPost) {
    const { data } = await axios.post(`classes`, dataPost);
    return data;
  },
  async removeClass(id) {
    await axios.delete(`classes/${id}`);
    return "Class deleted successfully";
  },
  async changeClassName(id, data) {
    await axios.put(`classes/${id}`, data);
    return;
  }

};
export default functionsClasses;
