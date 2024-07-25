import axios from "axios";
import { baseURL } from "./api";

const teacherController = {
    async postTeacherInSubjectId(teacherSubjectId, dataTeacher) {
        try {
            await axios.post(`${baseURL}/teachers?subjectId=${teacherSubjectId}`, dataTeacher);
        } catch (error) {
            console.log(`Error get techer \n ${error}`);
        }
    },

    async putTeacher(teacherId, subjectId, dataTeacher) {
        console.log(teacherId);
        console.log(subjectId);
        console.log(dataTeacher);
        try {
            await axios.put(`${baseURL}/teachers/${teacherId}?subjectId=${subjectId}`, dataTeacher);
        } catch (error) {
            console.log(`Error put teacher \n ${error}`);
        }
    },

    async getTeacher() {
        try {
            const { data } = await axios.get(`${baseURL}/teachers`);
            return data;
        } catch (error) {
            console.log(`Error get techer \n ${error}`);
        }
    },
    async getTeacherInId(teacherId) {
        try {
            const { data } = await axios.get(`${baseURL}/teachers/${teacherId}`);
            return data;
        } catch (error) {
            console.log(`Error get techer \n ${error}`);
        }
    },
    async removeTeacher(teacherId) {
        try {
            await axios.delete(`${baseURL}/teachers/${teacherId}`);
        } catch (error) {
            console.log(`Error delete teacher \n ${error}`);
        }
    }

}

export default teacherController;