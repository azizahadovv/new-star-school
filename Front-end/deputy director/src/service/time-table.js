import axios from "axios"
import { baseURL } from "./api"
import { toast } from "react-toastify"

const TimeTable = {
    async getTimeTableInId(classesId) {
        try {
            const { data } = await axios.get(`${baseURL}/classes/classes/${classesId}/timetables`)
            return data
        } catch (error) {
            toast.error(error.message)
        }
    },
    async getAllTimeTable() {
        try {
            const { data } = await axios.get(`${baseURL}/v1/timetables`)
            return data
        } catch (error) {
            toast.error(error.message)
        }
    },
    async addTimeTable(data) {
        try {
            await axios.post(`${baseURL}/v1/timetables`, data)
            console.log("sucessfully added");
        } catch (error) {
            toast.error(error.message)
        }
    },
    async TrashData(dataId) {
        try {
            await axios.delete(`${baseURL}/v1/timetables/${dataId}`)
            console.log("Data successfully deleted");
        } catch (error) {
            toast.error(error.message)
        }
    },
    async updateTimeTable(dataId, data) {
        try {
            await axios.put(`${baseURL}/v1/timetables/${dataId}`, data)
            console.log("Data successfully updated");
        } catch (error) {
            toast.error(error.message)
        }
    },
    async myClasses(teacherId, termId = 1) {
        try {
            if (teacherId != null || teacherId !== undefined || teacherId !== '') {
                const { data } = await axios.get(`${baseURL}/v1/timetables/filter?termId=${termId}&teacherId=${teacherId}`)
                return data
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
}

export default TimeTable