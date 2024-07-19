import axios from "axios";
import { baseURL } from "./api";

const studentFunction={
    async studentPostData(classId,dataPost){
        const {data} = await axios.post(`${baseURL}/classes/${classId}/students`, dataPost);
        return data;
    },
    async getStudent(){
        const {data} = await axios.get(`${baseURL}/students`);
        return data;
    },
    async studentPutActie(id, dataActive){
        const {data} = await axios.put(`${baseURL}/students/${id}`, dataActive);
        return data;
    },
    async studentDeleteActie(id){
        const {data} = await axios.delete(`${baseURL}/students/${id}`);
        return data;
    }
 
}

export default studentFunction;