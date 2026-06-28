import { toast } from "react-toastify";
import axios from "./api";
import { useNavigate } from "react-router-dom";
const personnel_controllers = {
    async postdata(data) {
        try {
            await axios.post('staff', data)
            console.log("Post data");
        } catch (error) {
            toast.error(error);
        }
    },
    async deleteData(ids) {
        const x = window.confirm("Are you sure to delete this data?");
        console.log(x);
        if (x) {
            try {
                await axios.delete(`staff/${ids}`)
                console.log("remove data");
            } catch (error) {
                toast.error(error);
            }
        } else {
            return toast.info(`Are you sure to delete this data`);
        }

    },
    async getDataPersons() {
        try {
            const { data } = await axios.get('staff');
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async getDataPersonsInID(ids) {
        try {
            const { data } = await axios.get(`staff/${ids}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    },

    async updateImage(ids, data) {
        try {
            await axios.post(`staff/${ids}/upload-image`, data);
            toast.success("image updated successfully")
        } catch (error) {
            console.log(error);
        }
    },

    async updateUsersData(id, data) {
        try {
            await axios.put(`staff/${id}`, data)
            toast.success("Data updated successfully")
        } catch (error) {
            toast.error(error)
        }
    },
    async searchdata(userName) {
        try {
            const { data } = await axios.get(`staff/search?name=${userName}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

}



export default personnel_controllers