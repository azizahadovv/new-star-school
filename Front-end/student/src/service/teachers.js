import { toast } from "react-toastify";
import axios from "./api";

const auth = {
    headers: {
        'accept': '*/*',
        'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
    }
}


const teachersCotrol = {
    async getTeachers(ids) {
        try {
            if (ids !== "") {
                const { data } = await axios.get(`teachers/subject/${ids}`,auth);
                return data;
            }
        } catch (error) {
            toast.error(error?.message)
        }
    },

};

export default teachersCotrol;