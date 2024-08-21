import { toast } from "react-toastify";

export function setLocalData(key, data) {
    try {
        localStorage.setItem(key, data)
    } catch (error) {
        console.log(error + "\n Error Localstoreg setData");
        toast.error(error.message)
    }
}
export function getLocalData(data) {
    try {
        return localStorage.setItem(data)
    } catch (error) {
        console.log(error + "\n Error Localstoreg setData");
        toast.error(error.message)

    }
}