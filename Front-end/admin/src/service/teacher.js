import axios from "axios";
import { baseURL } from "./api";

const teacherController = {
    async searchTeacher(techerName, subjectId) {
        try {
            const { data } = await axios.get(`${baseURL}/teachers/search?subjectId=${subjectId}&name=${techerName}`)
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async postTeacherInSubjectId(teacherSubjectId, dataTeacher, role) {
        try {
            await axios.post(`${baseURL}/teachers?subjectId=${teacherSubjectId}&role=${role}`, dataTeacher);
        } catch (error) {
            console.log(`Error get techer \n ${error}`);
        }
    },

    async putTeacher(teacherId, subjectId, dataTeacher) {
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
    },

    async getTeacherInSubjectIdAndChaced(weekDay,startTime,endTime,subjectId) {
        try {
            const { data } = await axios.get(`${baseURL}/teachers/available?dayOfWeek=${weekDay}&startTime=${startTime}&endTime=${endTime}&subjectId=${subjectId}`);
            return data;
        } catch (error) {
            console.log(`Error get techer \n ${error}`);
        }
    },
    async uploadImg(teacherId, file) {
        try {
            await axios.post(`${baseURL}/teachers/${teacherId}/upload-image`, file)
            console.log("success upload");
        } catch (error) {
            console.log(error);
        }
    }

}

export default teacherController;