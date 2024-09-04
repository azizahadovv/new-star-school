import axios from './api'
import { toast } from "react-toastify"


const auth = {
    headers: {
        'accept': '*/*',
        'Authorization': " " + 'Bearer ' + localStorage.getItem('jwtToken')
    }
}


const TimeTable = {
    async getTimeTableInId(classesId) {
        const { data } = await axios.get(`classes/classes/${classesId}/timetables`, auth)
        return data
    },
    async getAllTimeTable() {
        const { data } = await axios.get(`v1/timetables`, auth)
        return data
    },
    async addTimeTable(data) {
        try {
            await axios.post(`v1/timetables`, data, auth)
            toast.success("sucessfully added");
            return
        } catch (error) {
            toast.error(error);
        }
    },
    async TrashData(dataId) {
        try {
            await axios.delete(`v1/timetables/${dataId}`, auth);
            toast.success("Data successfully deleted");
        } catch (error) {
            toast.error(error);
        }
    },
    async updateTimeTable(dataId, data) {
        try {
            await axios.put(`v1/timetables/${dataId}`, data, auth)
            toast.error("Data successfully updated");
        } catch (error) {
            toast.error(error);
        }
    }
}

export default TimeTable