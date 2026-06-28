import { toast } from "react-toastify"
import axios from "./api"
const auth = {
    headers: {
        'accept': '*/*',
        'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
    }
}


const TimeTable = {
    async getTimeTableInId(classesId) {
        try {
            const { data } = await axios.get(`classes/classes/${classesId}/timetables`, auth)
            return data
        } catch (error) {
            toast.error(error.message)
        }
    },
    async getAllTimeTable() {
        try {
            const { data } = await axios.get(`v1/timetables`, auth)
            return data
        } catch (error) {
            toast.error(error.message)
        }
    },
    async addTimeTable(data) {
        try {
            await axios.post(`v1/timetables`, data, auth)
            console.log("sucessfully added");
        } catch (error) {
            toast.error(error.message)
        }
    },
    async TrashData(dataId) {
        try {
            await axios.delete(`v1/timetables/${dataId}`, auth)
            toast.success("Data successfully deleted");
        } catch (error) {
            toast.error(error.message)
        }
    },
    async updateTimeTable(dataId, data) {
        try {
            await axios.put(`v1/timetables/${dataId}`, data, auth)
            console.log("Data successfully updated");
        } catch (error) {
            toast.error(error.message)
        }
    },
    async myClasses(teacherId, termId = 1) {
        try {
            if (teacherId != null || teacherId !== undefined || teacherId !== '') {
                const { data } = await axios.get(`v1/timetables/filter?termId=${termId}&teacherId=${teacherId}`, auth)
                return data
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
}

export default TimeTable