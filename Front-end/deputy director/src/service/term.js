import { toast } from 'react-toastify'
import { baseURL } from './api'
import axios from 'axios'

const TermControl = {
    async myTerm() {
        try {
            const { data } = await axios.get(`${baseURL}/v1/terms`)
            return data
        } catch (error) {
            toast.error(error.message)
        }
    }
}


export default TermControl