import { toast } from 'react-toastify'
import axios from './api'

const auth = {
    headers: {
        'accept': '*/*',
    }
}

const classInId = {
    async myClasses(classId) {
        try {
            const { data } = await axios.get(`classes/${classId}`, auth)
            return data
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}


export default classInId