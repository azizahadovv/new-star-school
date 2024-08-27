import axios from './api'

const subjectFunction = {
    async getSubjects() {
        try {
            const { data } = await axios.get(`subjects`);
            return data;
        } catch (error) {
            console.log(" get subject error \n" + error);
        }
    },
    async addSubject(dataPost) {
        try {
            const { data } = await axios.post(`subjects`, dataPost);
            return data;
        } catch (error) {
            console.log("add subject error \n" + error);
        }
    },
    async changeSubject(id, changeData) {
        try {
            const { data } = await axios.put(`subjects/${id}`, changeData);
            return data;
        } catch (error) {
            console.log("add subject error \n" + error);
        }
    },

    async removeSubject(subjectId) {
        try {
            await axios.delete(`subjects/${subjectId}`);
            return;
        } catch (error) {
            console.log("error remove subjects \n" + error);
        }
    },


}



export default subjectFunction