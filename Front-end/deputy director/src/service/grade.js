import axios from 'axios'
import { toast } from 'react-toastify'
import { baseURL } from './api'


const gradeStudents = {
    async postGarde(data) {
        try {
            await axios.post(`${baseURL}/v1/grades`, data)
            toast.success("Successfully")
        } catch (error) {
            toast.error(error.message)
        }
    }
}


export default gradeStudents
