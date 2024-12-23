import axios from "./api"
import { toast } from "react-toastify";


const auth = {
    headers: {
        'accept': '*/*',
        'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
    }
}


const teacherController = {
    async getClassesInTeacherId(idTecher) {
        try {
            const { data } = await axios.get(`teachers/${idTecher}/classes`, auth);
            return data;
        } catch (error) {
            toast.error(error.message)
        }
    },

    async searchTeacher(techerName, subjectId) {
        try {
            const { data } = await axios.get(`teachers/search?subjectId=${subjectId}&name=${techerName}`, auth)
            return data;
        } catch (error) {
            toast.error(error.message)
            console.log(error);
        }
    },
    async postTeacherInSubjectId(teacherSubjectId, dataTeacher, role) {
        try {
            await axios.post(`teachers?subjectId=${teacherSubjectId}&role=${role}`, dataTeacher, auth);
        } catch (error) {
            toast.error(error.message)
            console.log(`Error get techer \n ${error}`);
        }
    },

    async putTeacher(teacherId, subjectId, dataTeacher) {
        try {
            await axios.put(`teachers/${teacherId}?subjectId=${subjectId}`, dataTeacher, auth);
        } catch (error) {
            toast.error(error.message)
            console.log(`Error put teacher \n ${error}`);
        }
    },

    async getTeacher() {
        try {
            const { data } = await axios.get(`teachers`, auth);
            return data;
        } catch (error) {
            toast.error(error.message)
            console.log(`Error get techer \n ${error}`);
        }
    },
    async getTeacherInId(teacherId) {
        try {
            const { data } = await axios.get(`teachers/${teacherId}`, auth);
            return data;
        } catch (error) {
            toast.error(error.message)
            console.log(`Error get techer \n ${error}`);
        }
    },
    async removeTeacher(teacherId) {
        try {
            await axios.delete(`teachers/${teacherId}`, auth);
        } catch (error) {
            toast.error(error.message)
            console.log(`Error delete teacher \n ${error}`);
        }
    },
    async getTeacherInSubjectId(subjectId) {
        try {
            const { data } = await axios.get(`teachers/subject/${subjectId}`, auth);
            return data;
        } catch (error) {
            toast.error(error.message)
            console.log(`Error get techer \n ${error}`);
        }
    },
    async uploadImg(teacherId, file) {
        try {
            await axios.post(`teachers/${teacherId}/upload-image`, file, auth)
            toast.success("success upload");
        } catch (error) {
            toast.error(error.message)
        }
    }

}

export default teacherController;