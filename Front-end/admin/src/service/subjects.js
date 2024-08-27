import axios from "axios"
import { baseURL } from "./api"
import { toast } from "react-toastify";
const subjectFunction = {
    async getSubjects() {
        try {
            const { data } = await axios.get(`${baseURL}/subjects`);
            return data;
        } catch (error) {
            toast.error(" get subject error \n" + error);
        }
    },
    async addSubject(dataPost) {
        try {
            const { data } = await axios.post(`${baseURL}/subjects`, dataPost);
            return data;
        } catch (error) {
            toast.error("add subject error \n" + error);
        }
    },
    async changeSubject(id, changeData) {
        try {
            const { data } = await axios.put(`${baseURL}/subjects/${id}`, changeData);
            return data;
        } catch (error) {
            toast.error("add subject error \n" + error);
        }
    },

    async removeSubject(subjectId) {
        try {
            await axios.delete(`${baseURL}/subjects/${subjectId}`);
            return;
        } catch (error) {
            toast.error("error remove subjects \n" + error);
        }
    },


}



export default subjectFunction