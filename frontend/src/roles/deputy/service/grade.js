import axios from './api'
import { toast } from 'react-toastify'

const auth = {
    headers: {
        'accept': '*/*',
        'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
    }
}


const gradeStudents = {
    async postGarde(data) {
        try {
            await axios.post(`v1/grades`, data, auth)
            toast.success("Successfully")
        } catch (error) {
            toast.error(error.message)
        }
    }
}


export default gradeStudents
