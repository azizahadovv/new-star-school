import axios from "./api"
import { toast } from "react-toastify";


const auth = {
  headers: {
    'accept': '*/*',
    'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
  }
}


const functionsClasses = {
  async getClasses() {
    try {
      const { data } = await axios.get(`classes`, auth);
      return data;
    } catch (error) {
      toast.error(error.message)
    }
  },
  async classPostData(dataPost) {
    try {
      const { data } = await axios.post(`classes`, dataPost, auth);
      return data;
    } catch (error) {
      toast.error(error.message)
    }
  },
  async removeClass(id) {
    try {
      await axios.delete(`classes/${id}`, auth);
    } catch (error) {
      toast.error(error.message)
    }
  },
  async changeClassName(id, data) {
    try {
      await axios.put(`classes/${id}`, data, auth);
    } catch (error) {
      toast.error(error.message)
    }
  }

};
export default functionsClasses;
