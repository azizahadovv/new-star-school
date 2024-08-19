import axios from "axios";
import { baseURL } from "./api";
import { toast } from "react-toastify";

const student_Page_Function = {
    async get_All_Student() {
        try {
            const { data } = await axios.get(`${baseURL}/students`);
            return data;
        }
        catch (error) {
            toast.error("Error getting student data");
        }
    },
    async get_student_in_Id(studentId) {
        try {
            const { data } = await axios.get(`${baseURL}/students/${studentId}`);
            return data;
        } catch (error) {
            toast.error(` Error get_student_in_Id  ${error}`);
        }
    },
    async Put_Student(id, dataStudent) {
        try {
            await axios.put(`${baseURL}/students/${id}`, dataStudent);
            return
        } catch (error) {
            toast.error("error removed \n" + error);
        }
    },
    async remove_Student(id) {
        try {
            await axios.delete(`${baseURL}/students/${id}`);
            toast.error("successfully removed" + id);
            return
        } catch (error) {
            toast.error("error removed \n" + error);
        }
    },
    async search_Student(keywordId, keywordName) {
        try {
            const { data } = await axios.get(`${baseURL}/students/search-by?classId=${keywordId}&name=${keywordName}`);
            return data
        } catch (error) {
            toast.error(error.message);
        }
    },
    async uploadFile(studentId, file) {
        try {
            await axios.post(`${baseURL}/students/${studentId}/upload-image`, file)
            toast.error("successfully uploaded");
        } catch (error) {
            toast.error(error);
        }
    }
}

export default student_Page_Function