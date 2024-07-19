export function setLocalData(key,data){
    try {
        localStorage.setItem(key,data)
    } catch (error) {
        console.log(error+"\n Error Localstoreg setData");
    }
}
export function getLocalData(data){
    try {
       localStorage.setItem(data)
    } catch (error) {
        console.log(error+"\n Error Localstoreg setData");
    }
}