import axios from "axios"
import { baseURL } from "./api"



const subjectFunction = {
    async getSubjects() {
        try {
            const { data } = await axios.get(`${baseURL}/subjects`);
            return data;
        } catch (error) {
            console.log(" get subject error \n"+error);
        }
      },


}



export default subjectFunction