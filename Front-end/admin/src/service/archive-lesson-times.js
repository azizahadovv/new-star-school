import { toast } from "react-toastify";
import axios from "./api";

const auth = {
    headers: {
        'accept': '*/*',
        'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
    }
}

const lesson_times = {
    async getTimes() {
        try {
            const { data } = await axios.get(`v1/school-time`, auth);
            return data;
        } catch (error) {
            toast.error(error);
            throw error; // Optional: re-throw the error if you want the caller to handle it
        }
    },
    async delete(ids) {
        try {
            await axios.delete(`v1/school-time/${ids}`, auth)
            toast.success('Successfully deleted')
        } catch (error) {
            toast.error(error?.message)
        }
    }
};

export default lesson_times;
