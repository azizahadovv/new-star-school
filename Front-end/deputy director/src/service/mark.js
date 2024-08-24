import { toast } from 'react-toastify'
import { baseURL } from './api'
import axios from 'axios'

const MarkClass = {
    async getMarks(teacherId, subjectId, schoolClassId, termId) {
        try {
            const { data } = await axios.get(`${baseURL}/v1/grades/grouped-by-date?teacherId=${teacherId}&subjectId=${subjectId}&termId=${termId}&schoolClassId=${schoolClassId}`)
            return data
        } catch (error) {
            toast.error(error.message)
        }
    }
}


export default MarkClass