import axios from "axios"
import { baseURL } from "./api"

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
            console.log("sucessfully added");
        } catch (error) {
            console.log(error);
        }
    },
    async TrashData(dataId) {
        try {
            await axios.delete(`${baseURL}/v1/timetables/${dataId}`)
            console.log("Data successfully deleted");
        } catch (error) {
            console.log(error);
        }
    }
}

export default TimeTable