import { toast } from "react-toastify";
import axios from "./api";

const auth = {
    headers: {
        'accept': '*/*',
        'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
    }
}

const user_register = {
    async getUserData(userId) {
        try {
            const { data } = await axios.get(`teachers/${userId}`, auth);
            return data;
        } catch (error) {
            toast.error("Failed to retrieve user data. Please try again.");
            throw error; // Optional: re-throw the error if you want the caller to handle it
        }
    },

    async getUserSubjects(userId) {
        try {
            const { data } = await axios.get(`teachers/${userId}/subjects`, auth);
            return data;
        } catch (error) {
            toast.error("Failed to retrieve user data. Please try again.");
            throw error; // Optional: re-throw the error if you want the caller to handle it
        }
    }
};

export default user_register;