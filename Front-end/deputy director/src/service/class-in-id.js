import axios from 'axios'
import { toast } from 'react-toastify'
import { baseURL } from './api'


const classInId = {
    async myClasses(classId) {
        try {
            const { data } = await axios.get(`${baseURL}/classes/${classId}`)
            return data
        } catch (error) {
            toast.error(error.message)
        }
    }
}


export default classInId