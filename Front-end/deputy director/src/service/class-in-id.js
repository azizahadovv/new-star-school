import axios from "./api"
import { toast } from 'react-toastify'

const auth = {
    headers: {
        'accept': '*/*',
        'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
    }
}

const classInId = {
    async myClasses(classId) {
        try {
            const { data } = await axios.get(`classes/${classId}`,auth)
            return data
        } catch (error) {
            toast.error(error.message)
        }
    }
}


export default classInId