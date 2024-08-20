import { toast } from "react-toastify";
import axios from "./api";

const studentCotrol = {
    async getStudentSchedule() {
        const ids = localStorage.getItem('studentId')
        try {
            if (ids != null || ids !== undefined || ids !== '') {
                const { data } = await axios.get(`students/${ids}/timetable`);
                return data;
            }
        } catch (error) {
            toast.error(error?.message)
        }
    },

};

export default studentCotrol;