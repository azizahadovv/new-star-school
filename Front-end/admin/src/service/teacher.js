import axios from "axios";
import { baseURL } from "./api";

const teacherController = {
    async getTeacher() {
        try {
            const { data } = await axios.get(`${baseURL}/teachers`);
            return data;
        } catch (error) {
            console.log(`Error get techer \n ${error}`);
        }
    }
}

export default teacherController;