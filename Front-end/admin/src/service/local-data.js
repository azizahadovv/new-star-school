import { toast } from "react-toastify";

export function setLocalData(key,data){
    try {
        localStorage.setItem(key,data)
    } catch (error) {
        toast.error(error+"\n Error Localstoreg setData");
    }
}
export function getLocalData(data){
    try {
       return localStorage.setItem(data)
    } catch (error) {
        toast.error(error+"\n Error Localstoreg setData");
    }
}