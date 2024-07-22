import axios from "axios";
import { baseURL } from "./api";

const student_Page_Function = {
    async get_All_Student() {
        try {
            const { data } = await axios.get(`${baseURL}/students`);
            return data;
        }
        catch (error) {
            console.log("Error getting student data");
        }
    },
    async remove_Student(id) {
        try {
            await axios.delete(`${baseURL}/students/${id}`);
            console.log("successfully removed"+id);
            return
        } catch (error) {
            console.log("error removed \n" + error);
        }
    }
}

export default student_Page_Function