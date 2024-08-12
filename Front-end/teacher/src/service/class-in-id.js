import { toast } from 'react-toastify'
import axios from './api'

const classInId = {
    async myClasses(classId) {
        try {
            const { data } = await axios.get(`/classes/${classId}`)
            return data
        } catch (error) {
            toast.error(error.message)
        }
    }
}


export default classInId