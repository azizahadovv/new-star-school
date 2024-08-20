import { toast } from "react-toastify";
import axios from "./api";

const teachersCotrol = {
    async getTeachers(ids) {
        try {
            if (ids !== "") {
                const { data } = await axios.get(`teachers/subject/${ids}`);
                return data;
            }
        } catch (error) {
            toast.error(error?.message)
        }
    },

};

export default teachersCotrol;