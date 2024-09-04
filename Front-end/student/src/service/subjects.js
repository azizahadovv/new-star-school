import { toast } from "react-toastify";
import axios from "./api";

const auth = {
    headers: {
        'accept': '*/*',
        'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
    }
}


const subjectsCotrol = {
    async getSubjects() {
        try {
            const { data } = await axios.get("subjects",auth);
            return data;
        } catch (error) {
            toast.error(error?.message)
        }
    },

};

export default subjectsCotrol;