import axios from "axios"
import { baseURL } from "./api"
import { toast } from "react-toastify"

const TimeTable = {
    async getTimeTableInId(classesId) {
        const { data } = await axios.get(`${baseURL}/classes/classes/${classesId}/timetables`)
        return data
    },
    async getAllTimeTable() {
        const { data } = await axios.get(`${baseURL}/v1/timetables`)
        return data
    },
    async addTimeTable(data) {
        try {
            await axios.post(`${baseURL}/v1/timetables`, data)
            toast.error("sucessfully added");
        } catch (error) {
            toast.error(error);
        }
    },
    async TrashData(dataId) {
        try {
            await axios.delete(`${baseURL}/v1/timetables/${dataId}`)
            toast.error("Data successfully deleted");
        } catch (error) {
            toast.error(error);
        }
    },
    async updateTimeTable(dataId, data) {
        try {
            await axios.put(`${baseURL}/v1/timetables/${dataId}`, data)
            toast.error("Data successfully updated");
        } catch (error) {
            toast.error(error);
        }
    }
}

export default TimeTable