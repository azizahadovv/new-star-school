import { toast } from 'react-toastify'
import axios from './api'

const auth = {
    headers: {
        'accept': '*/*',
    }
}


const MarkClass = {
    async getMarks(teacherId, subjectId, schoolClassId, termId) {
        return await axios.get(`v1/grades/grouped-by-date?teacherId=${teacherId}&subjectId=${subjectId}&termId=${termId}&schoolClassId=${schoolClassId}`, auth).then(({
            data
        }) => {
            return data;
        }).catch((error) => {
                return toast.error(`Error get archived user \n ${error.message}`);
            });
    }
}


export default MarkClass