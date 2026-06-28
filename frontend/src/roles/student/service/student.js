import { toast } from "react-toastify";
import axios from "./api";

const auth = {
    headers: {
        'accept': '*/*',
        'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
    }
}


const studentCotrol = {
    async getStudentSchedule(studentId, termId = '1') {
        try {
            if (studentId != null || studentId !== undefined || studentId !== '') {
                const { data } = await axios.get(`v1/timetables/filter?termId=${termId}&studentId=${studentId}`, auth);
                return data;
            }
        } catch (error) {
            toast.error(error?.message)
        }
    },
    async getStudentInId(studentId) {
        try {
            const { data } = await axios.get(`students/${studentId}`, auth);
            return data;
        } catch (error) {
            toast.error(error?.message)
        }
    },
    async uploadImg(studentId, file) {
        try {
            await axios.post(`/students/${studentId}/upload-image`, file, auth)
            toast.success('Image uploaded successfully')
        } catch (error) {
            toast.error(error?.message)
        }
    }

};

export default studentCotrol;