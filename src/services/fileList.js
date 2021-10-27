import axios from "axios";
// import { resolve } from "core-js/fn/promise";

const path = ''
class FileListService {
    async getDataByDevice(addr){
        // return ("address/tdms")
        // return (resolve => ("address/tdms"))
        // .get()
        // .then("address/tdms")
        axios
        .get(`${path}`, {params: { ID: addr }})
        // .get(`${path}`, {params: { device: dvId }})
        .then((res)=> res.data)
        .catch(handleAxiosError)
    }
}

export {FileListService}
export default new FileListService()