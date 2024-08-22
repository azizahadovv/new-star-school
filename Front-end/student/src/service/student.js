import { toast } from "react-toastify";
import axios from "./api";

const studentCotrol = {
    async getStudentSchedule(studentId,termId='1') {
        
        try {
            if (studentId != null || studentId !== undefined || studentId !== '') {
                const { data } = await axios.get(`v1/timetables/filter?termId=${termId}&studentId=${studentId}`);
                return data;
            }
        } catch (error) {
            toast.error(error?.message)
        }
    },

};

export default studentCotrol;