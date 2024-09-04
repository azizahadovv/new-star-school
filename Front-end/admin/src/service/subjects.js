import { toast } from 'react-toastify';
import axios from './api'



const auth = {
    headers: {
        'accept': '*/*',
        'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
    }
}


const subjectFunction = {
    async getSubjects() {
        try {
            const { data } = await axios.get(`subjects`, auth);
            return data;
        } catch (error) {
            toast.error(" get subject error \n" + error);
        }
    },
    async addSubject(dataPost) {
        try {
            const { data } = await axios.post(`subjects`, dataPost, auth);
            return data;
        } catch (error) {
            toast.error("add subject error \n" + error);
        }
    },
    async changeSubject(id, changeData) {
        try {
            const { data } = await axios.put(`subjects/${id}`, changeData, auth);
            return data;
        } catch (error) {
            toast.error("add subject error \n" + error);
        }
    },

    async removeSubject(subjectId) {
        try {
            await axios.delete(`subjects/${subjectId}`, auth);
            return;
        } catch (error) {
            toast.error("error remove subjects \n" + error);
        }
    },


}



export default subjectFunction