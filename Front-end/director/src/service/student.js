import axios from "./api"

const studentsController = {
    async getStudentsData() {
        const { data } = await axios.get('students')
        return data
    },
    async getStudentInId(id) {
        const { data } = await axios.get(`students/${id}`)
        return data
    }
}


export default studentsController