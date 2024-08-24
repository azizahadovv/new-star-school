// 

import { toast } from "react-toastify";
import axios from "./api";

const GradeCotrol = {
    async getTerms(studentId, termId='1', ATTENDANCE = 'ATTENDANCE', teacherId='') {
        try {
            const { data } = await axios.get(`v1/grades/filter/grades-and-attendance?studentId=${studentId}&termId=${termId}&filterType=${ATTENDANCE}&teacherId=${String(teacherId)}`);
            return data;
        } catch (error) {
            toast.error(error.message)
        }
    },

};

export default GradeCotrol;