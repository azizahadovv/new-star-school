import axios from './api'
import { toast } from "react-toastify"

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
            toast.success("sucessfully added");
            return
        } catch (error) {
            console.log(error);
        }
    },
    async TrashData(dataId) {
        try {
            await axios.delete(`v1/timetables/${dataId}`)
            console.log("Data successfully deleted");
        } catch (error) {
            console.log(error);
        }
    },
    async updateTimeTable(dataId, data) {
        try {
            await axios.put(`v1/timetables/${dataId}`, data)
            console.log("Data successfully updated");
        } catch (error) {
            console.log(error);
        }
    }
}

export default TimeTable