import axios from "./api"
import { toast } from "react-toastify";

const auth = {
    headers: {
        'accept': '*/*',
        'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
    }
}


const subjectFunction = {
    async getSubjects() {
        try {
            const { data } = await axios.get(`subjects`,auth);
            return data;
        } catch (error) {
            toast.error(error.message)
            console.log(" get subject error \n" + error);
        }
    },
}



export default subjectFunction