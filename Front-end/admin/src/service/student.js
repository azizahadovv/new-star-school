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
    async get_student_in_Id(studentId) {
        try {
            const { data } = await axios.get(`${baseURL}/students/${studentId}`);
            return data;
        } catch (error) {
            console.log(` Error get_student_in_Id  ${error}`);
        }
    },
    async Put_Student(id,dataStudent) {
        try {
            await axios.put(`${baseURL}/students/${id}`,dataStudent);
            return
        } catch (error) {
            console.log("error removed \n" + error);
        }
    },
    async remove_Student(id) {
        try {
            await axios.delete(`${baseURL}/students/${id}`);
            console.log("successfully removed" + id);
            return
        } catch (error) {
            console.log("error removed \n" + error);
        }
    }
}

export default student_Page_Function