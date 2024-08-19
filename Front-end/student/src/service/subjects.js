import { toast } from "react-toastify";
import axios from "./api";

const subjectsCotrol = {
    async getSubjects() {
        try {
            const { data } = await axios.get("subjects");
            return data;
        } catch (error) {
            toast.error(error?.message)
        }
    },

};

export default subjectsCotrol;