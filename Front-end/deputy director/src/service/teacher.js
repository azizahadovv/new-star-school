import axios from "axios";
import { baseURL } from "./api";
import { toast } from "react-toastify";

const teacherController = {
    async searchTeacher(techerName, subjectId) {
        try {
            const { data } = await axios.get(`${baseURL}/teachers/search?subjectId=${subjectId}&name=${techerName}`)
            return data;
        } catch (error) {
            toast.error(error.message)
            console.log(error);
        }
    },
    async postTeacherInSubjectId(teacherSubjectId, dataTeacher, role) {
        try {
            await axios.post(`${baseURL}/teachers?subjectId=${teacherSubjectId}&role=${role}`, dataTeacher);
        } catch (error) {
            toast.error(error.message)
            console.log(`Error get techer \n ${error}`);
        }
    },

    async putTeacher(teacherId, subjectId, dataTeacher) {
        try {
            await axios.put(`${baseURL}/teachers/${teacherId}?subjectId=${subjectId}`, dataTeacher);
        } catch (error) {
            toast.error(error.message)
            console.log(`Error put teacher \n ${error}`);
        }
    },

    async getTeacher() {
        try {
            const { data } = await axios.get(`${baseURL}/teachers`);
            return data;
        } catch (error) {
            toast.error(error.message)
            console.log(`Error get techer \n ${error}`);
        }
    },
    async getTeacherInId(teacherId) {
        try {
            const { data } = await axios.get(`${baseURL}/teachers/${teacherId}`);
            return data;
        } catch (error) {
            toast.error(error.message)
            console.log(`Error get techer \n ${error}`);
        }
    },
    async removeTeacher(teacherId) {
        try {
            await axios.delete(`${baseURL}/teachers/${teacherId}`);
        } catch (error) {
            toast.error(error.message)
            console.log(`Error delete teacher \n ${error}`);
        }
    },
    async getTeacherInSubjectId(subjectId) {
        try {
            const { data } = await axios.get(`${baseURL}/teachers/subject/${subjectId}`);
            return data;
        } catch (error) {
            toast.error(error.message)
            console.log(`Error get techer \n ${error}`);
        }
    },
    async uploadImg(teacherId, file) {
        try {
            await axios.post(`${baseURL}/teachers/${teacherId}/upload-image`, file)
            console.log("success upload");
        } catch (error) {
            toast.error(error.message)
        }
    }

}

export default teacherController;