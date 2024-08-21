import axios from "axios"
import { baseURL } from "./api"
import { toast } from "react-toastify";
const subjectFunction = {
    async getSubjects() {
        try {
            const { data } = await axios.get(`${baseURL}/subjects`);
            return data;
        } catch (error) {
            toast.error(error.message)
            console.log(" get subject error \n" + error);
        }
    },
}



export default subjectFunction