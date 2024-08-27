import axios from './api'


const teacherController = {
    async searchTeacher(techerName, subjectId) {
        try {
            const { data } = await axios.get(`teachers/search?subjectId=${subjectId}&name=${techerName}`)
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async postTeacherInSubjectId(teacherSubjectId, dataTeacher, role) {
        try {
            await axios.post(`teachers?subjectId=${teacherSubjectId}&role=${role}`, dataTeacher);
        } catch (error) {
            console.log(`Error get techer \n ${error}`);
        }
    },

    async putTeacher(teacherId, subjectId, dataTeacher) {
        try {
            await axios.put(`teachers/${teacherId}?subjectId=${subjectId}`, dataTeacher);
        } catch (error) {
            console.log(`Error put teacher \n ${error}`);
        }
    },

    async getTeacher() {
        try {
            const { data } = await axios.get(`teachers`);
            return data;
        } catch (error) {
            console.log(`Error get techer \n ${error}`);
        }
    },
    async getTeacherInId(teacherId) {
        try {
            const { data } = await axios.get(`teachers/${teacherId}`);
            return data;
        } catch (error) {
            console.log(`Error get techer \n ${error}`);
        }
    },
    async removeTeacher(teacherId) {
        try {
            await axios.delete(`teachers/${teacherId}`);
        } catch (error) {
            console.log(`Error delete teacher \n ${error}`);
        }
    },

    async getTeacherInSubjectIdAndChaced(weekDay,startTime,endTime,subjectId) {
        try {
            const { data } = await axios.get(`teachers/available?dayOfWeek=${weekDay}&startTime=${startTime}&endTime=${endTime}&subjectId=${subjectId}`);
            return data;
        } catch (error) {
            console.log(`Error get techer \n ${error}`);
        }
    },
    async uploadImg(teacherId, file) {
        try {
            await axios.post(`teachers/${teacherId}/upload-image`, file)
            console.log("success upload");
        } catch (error) {
            console.log(error);
        }
    }

}

export default teacherController;