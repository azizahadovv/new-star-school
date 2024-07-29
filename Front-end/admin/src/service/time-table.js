import axios from "axios"
import { baseURL } from "./api"

const TimeTable = {
    async getTimeTableInId(id) {
        const { data } = await axios.get(`${baseURL}/v1/timetables/${id}`)
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
}

export default TimeTable