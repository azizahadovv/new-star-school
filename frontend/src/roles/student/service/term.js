import { toast } from "react-toastify";
import axios from "./api";

const auth = {
    headers: {
        'accept': '*/*',
    }
}


const TermCotrol = {
    async getTerms() {
        try {
            const { data } = await axios.get(`v1/terms`, auth);
            return data;
        } catch (error) {
            toast.error(error.message)
        }
    },

};

export default TermCotrol;