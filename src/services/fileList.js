import axios from "axios";
// import { resolve } from "core-js/fn/promise";


class FileListService {
    async getDataByDevice(addr){
       
        return axios
        .get(`http://${addr}/tdms/`)
        // .get('/tdms', {params: { device: dvId }})
        .then((res)=> {
        console.log(res.data);
        return res.data
        })
        // .catch(handleAxiosError)
    }
}

export {FileListService}
export default new FileListService()