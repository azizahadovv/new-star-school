import { toast } from 'react-toastify';
import axios from './api'


const auth = {
    headers: {
        'accept': '*/*',
        'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
    }
}

const teacherController = {
    async searchTeacher(techerName, subjectId) {
        try {
            const { data } = await axios.get(`teachers/search?subjectId=${subjectId}&name=${techerName}`, auth)
            return data;
        } catch (error) {
            toast.error(error);
        }
    },
    async postTeacherInSubjectId(teacherSubjectId, dataTeacher, role) {
        try {
            await axios.post(`teachers?subjectId=${teacherSubjectId}&role=${role}`, dataTeacher, auth);
        } catch (error) {
            toast.error(`Error get techer \n ${error}`);
        }
    },

    async putTeacher(teacherId, subjectId, dataTeacher) {
        try {
            await axios.put(`teachers/${teacherId}?subjectId=${subjectId}`, dataTeacher, auth);
        } catch (error) {
            toast.error(`Error put teacher \n ${error}`);
        }
    },

    async getTeacher() {
        try {
            const { data } = await axios.get(`teachers`, auth);
            return data;
        } catch (error) {
            toast.error(`Error get techer \n ${error}`);
        }
    },
    async getTeacherInId(teacherId) {
        try {
            const { data } = await axios.get(`teachers/${teacherId}`, auth);
            return data;
        } catch (error) {
            toast.error(`Error get techer \n ${error}`);
        }
    },
    async removeTeacher(teacherId) {
        try {
            await axios.delete(`teachers/${teacherId}`, auth);
        } catch (error) {
            toast.error(`Error delete teacher \n ${error}`);
        }
    },

    async getTeacherInSubjectIdAndChaced(weekDay, startTime, endTime, subjectId) {
        try {
            const { data } = await axios.get(`teachers/available?dayOfWeek=${weekDay}&startTime=${startTime}&endTime=${endTime}&subjectId=${subjectId}`, auth);
            return data;
        } catch (error) {
            toast.error(`Error get techer \n ${error}`);
        }
    },
    async uploadImg(teacherId, file) {
        try {
            await axios.post(`teachers/${teacherId}/upload-image`, file, auth)
            toast.error("success upload");
        } catch (error) {
            toast.error(error);
        }
    },
    async getImage(imgId) {
        try {
            const { data } = await axios.get(`v1/files/${imgId}`, auth)
            toast.error("success upload");
            return data
        } catch (error) {
            toast.error(error);
        }
    }

}

export default teacherController;