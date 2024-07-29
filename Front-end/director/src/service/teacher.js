import axios from "./api";

const teacherControllers = {
    async getTeachersData() {
        const { data } = await axios.get('/teachers')
        return data;
    },
    async getTeachersDataInData(teacherId) {
        const { data } = await axios.get(`/teachers/${teacherId}`)
        return data;
    },
}


export default teacherControllers;