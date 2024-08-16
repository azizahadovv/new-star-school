import { toast } from 'react-toastify'
import axios from './api'

const gradeStudents = {
    async postGarde(data) {
        try {
            await axios.post(`v1/grades`,data)
            toast.success("Successfully")
        } catch (error) {
            toast.error(error.message)
        }
    }
}


export default gradeStudents
