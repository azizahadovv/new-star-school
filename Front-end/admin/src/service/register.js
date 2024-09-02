import { toast } from "react-toastify";
import axios from "./api";


const student_register = {
    async registerStudent(datas) {
        try {
            const { data } = await axios.post(`v1/auth/login`, datas);
            return data;
        } catch (error) {
            toast.error("Error in student registration", error);
        }
    }
};

export default student_register;