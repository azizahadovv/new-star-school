import { toast } from 'react-toastify'
import axios from './api'


const auth = {
    headers: {
        'accept': '*/*',
        'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
    }
}


const gradeStudents = {
    async postGarde(data) {
        await axios.post(`v1/grades`, data, auth).then((res) => {
            return toast.success("Successfully")
        }).catch((err) => {
            console.log(err);
            return toast.error(err.response.data.message)
        });

    }
}


export default gradeStudents
