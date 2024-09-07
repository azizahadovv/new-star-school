import { toast } from "react-toastify";
import axios from "./api";

const auth = {
    headers: {
        'accept': '*/*',
        'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
    }
}

const student_register = {
    async registerStudent(datas) {
        try {
            const { data } = await axios.post(`v1/auth/login`, datas);
            return data;
        } catch (error) {
            toast.error("Error in Admin registration", error);
        }
    },
    async refreshToken(datas) {
        try {
            const { data } = await axios.post(`v1/auth/refresh-token?refreshToken=${datas}`, auth);
            return data;
        } catch (error) {
            toast.error("Error in Admin registration", error);
        }
    },
    async ValidateToken(datas) {
        try {
            const { data } = await axios.get(`v1/auth/validate-token?token=${datas}`, auth);
            return data;
        } catch (error) {
            toast.error("Error in Admin registration", error);
        }
    },
};

export default student_register;