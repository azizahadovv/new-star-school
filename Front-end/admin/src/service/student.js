import axios from './api'


const student_Page_Function = {
    async get_All_Student() {
        try {
            const { data } = await axios.get(`students`);
            return data;
        }
        catch (error) {
            console.log("Error getting student data");
        }
    },
    async get_student_in_Id(studentId) {
        try {
            const { data } = await axios.get(`students/${studentId}`);
            return data;
        } catch (error) {
            console.log(` Error get_student_in_Id  ${error}`);
        }
    },
    async Put_Student(id, dataStudent) {
        try {
            await axios.put(`students/${id}`, dataStudent);
            return
        } catch (error) {
            console.log("error removed \n" + error);
        }
    },
    async remove_Student(id) {
        try {
            await axios.delete(`students/${id}`);
            console.log("successfully removed" + id);
            return
        } catch (error) {
            console.log("error removed \n" + error);
        }
    },
    async search_Student(keywordId, keywordName) {
        try {
            const { data } = await axios.get(`students/search-by?classId=${keywordId}&name=${keywordName}`);
            return data
        } catch (error) {
            console.log(error.message);
        }
    },
    async uploadFile(studentId, file) {
        try {
            await axios.post(`students/${studentId}/upload-image`, file)
            console.log("successfully uploaded");
        } catch (error) {
            console.log(error);
        }
    }
}

export default student_Page_Function