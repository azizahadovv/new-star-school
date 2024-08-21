import { toast } from 'react-toastify'
import axios from './api'

const TermControl = {
    async myTerm() {
        try {
            const { data } = await axios.get(`v1/terms`)
            return data
        } catch (error) {
            toast.error(error.message)
        }
    }
}


export default TermControl