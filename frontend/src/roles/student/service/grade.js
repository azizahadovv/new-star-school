// 

import { toast } from "react-toastify";
import axios from "./api";

const auth = {
    headers: {
        'accept': '*/*',
        'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
    }
}


const GradeCotrol = {
    async getTerms(studentId, termId = '1', ATTENDANCE = 'ATTENDANCE', teacherId = '') {
        return await axios.get(`v1/grades/filter/grades-and-attendance?studentId=${studentId}&termId=${termId}&filterType=${ATTENDANCE}&teacherId=${String(teacherId)}`, auth).then(({ data }) => {
            return data
        }).catch((err) => {
            toast.error(err.message);
            return null
        })
    },

};

export default GradeCotrol;