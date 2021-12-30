import axios from "axios";

class FileListService {
    async getDataByDevice(addr){
        return axios
        .get(`http://${addr}/tdms/`)
        // .get('/tdms', {params: { device: dvId }})
        .then((raw)=> {
        console.log(raw.data);
        return raw.data
        })
        // .catch(handleAxiosError)
    }
}

export {FileListService}
export default new FileListService()