import { toast } from 'react-toastify'
import axios from './api'

const teacherClass = {
    async myClasses(teacherId) {
        try {
            const { data } = await axios.get(`teachers/${teacherId}/classes`)
            return data
        } catch (error) {
            toast.error(error.message)
        }
    }
}


export default teacherClass