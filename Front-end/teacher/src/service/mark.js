import { toast } from 'react-toastify'
import axios from './api'

const auth = {
    headers: {
      'accept': '*/*',
      'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
    }
  }


const MarkClass = {
    async getMarks(teacherId, subjectId,schoolClassId, termId) {
        try {
            const { data } = await axios.get(`v1/grades/grouped-by-date?teacherId=${teacherId}&subjectId=${subjectId}&termId=${termId}&schoolClassId=${schoolClassId}`,auth)
            return data
        } catch (error) {
            toast.error(error.message)
        }
    }
}


export default MarkClass