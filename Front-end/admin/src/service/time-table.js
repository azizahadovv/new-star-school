import { toast } from "react-toastify"
import axios from "./api"

const TimeTable = {
    async getTimeTableInId(classesId) {
        const { data } = await axios.get(`classes/classes/${classesId}/timetables`)
        return data
    },
    async getAllTimeTable() {
        const { data } = await axios.get(`v1/timetables`)
        return data
    },
    async addTimeTable(data) {
        try {
            await axios.post(`v1/timetables`, data)
            toast.error("sucessfully added");
        } catch (error) {
            toast.error(error);
        }
    },
    async TrashData(dataId) {
        try {
            await axios.delete(`v1/timetables/${dataId}`)
            toast.error("Data successfully deleted");
        } catch (error) {
            toast.error(error);
        }
    },
    async updateTimeTable(dataId, data) {
        try {
            await axios.put(`v1/timetables/${dataId}`, data)
            toast.error("Data successfully updated");
        } catch (error) {
            toast.error(error);
        }
    }
}

export default TimeTable