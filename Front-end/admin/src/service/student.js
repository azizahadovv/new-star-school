import { toast } from 'react-toastify';
import axios from './api'

const auth = {
    headers: {
        'accept': '*/*',
        'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
    }
}

const student_Page_Function = {
    async get_All_Student() {
        try {
            const { data } = await axios.get(`students`, auth);
            return data;
        }
        catch (error) {
            toast.error("Error getting student data");
        }
    },
    async get_student_in_Id(studentId) {
        try {
            const { data } = await axios.get(`students/${studentId}`, auth);
            return data;
        } catch (error) {
            toast.error(` Error get_student_in_Id  ${error}`);
        }
    },
    async Put_Student(id, dataStudent) {
        try {
            await axios.put(`students/${id}`, dataStudent, auth);
            return
        } catch (error) {
            toast.error("error removed \n" + error);
        }
    },
    async remove_Student(id) {
        try {
            await axios.delete(`students/${id}`, auth);
            toast.error("successfully removed" + id);
            return
        } catch (error) {
            toast.error("error removed \n" + error);
        }
    },
    async search_Student(keywordId, keywordName) {
        try {
            const { data } = await axios.get(`students/search-by?classId=${keywordId}&name=${keywordName}`, auth);
            return data
        } catch (error) {
            toast.error(error.message);
        }
    },
    async uploadFile(studentId, file) {
        try {
            await axios.post(`students/${studentId}/upload-image`, file, auth)
            toast.error("successfully uploaded");
        } catch (error) {
            toast.error(error);
        }
    }
}

export default student_Page_Function