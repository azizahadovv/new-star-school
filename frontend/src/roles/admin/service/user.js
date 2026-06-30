import { toast } from "react-toastify";
import axios from "./api";

const auth = {
    headers: {
        'accept': '*/*',
    }
}

const user_register = {
    async getUserData(userId) {
        try {
            const { data } = await axios.get(`v1/admins/${userId}`, auth);
            return data;
        } catch (error) {
            toast.error("Failed to retrieve user data. Please try again.");
            throw error; // Optional: re-throw the error if you want the caller to handle it
        }
    },
    async uploadImg(studentId, file) {
        try {
            await axios.post(`v1/admins/${studentId}/upload-image`, file, auth)
            toast.success('Image uploaded successfully')
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
            throw error
        }
    }
};

export default user_register;
