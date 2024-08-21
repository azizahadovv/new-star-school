import { toast } from 'react-toastify'
import axios from './api'

const TeacherSchedule = {
    async myClasses(teacherId, termId = 1) {
        try {
            if (teacherId != null || teacherId !== undefined || teacherId !== '') {
                const { data } = await axios.get(`v1/timetables/filter?termId=${termId}&teacherId=${teacherId}`)
                return data
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
}


export default TeacherSchedule