import axios from './api'

const auth = {
  headers: {
    'accept': '*/*',
    'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
  }
}

const functionsClasses = {
  async getClasses() {
    const { data } = await axios.get(`classes`, auth);
    return data;
  },
  async classPostData(dataPost) {
    const { data } = await axios.post(`classes`, dataPost, auth);
    return data;
  },
  async removeClass(id) {
    await axios.delete(`classes/${id}`, auth);
    return "Class deleted successfully";
  },
  async changeClassName(id, data) {
    await axios.put(`classes/${id}`, data, auth);
    return;
  }

};
export default functionsClasses;
