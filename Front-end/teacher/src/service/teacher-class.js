import { toast } from 'react-toastify'
import axios from './api'

const auth = {
    headers: {
      'accept': '*/*',
      'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
    }
  }


const teacherClass = {
    async myClasses(teacherId) {
        try {
            const { data } = await axios.get(`teachers/${teacherId}/classes`,auth)
            return data
        } catch (error) {
            toast.error(error.message)
        }
    }
}


export default teacherClass