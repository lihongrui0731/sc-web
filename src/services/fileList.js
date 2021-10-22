import axios from "axios";

const path = ''
class FileListService {
    async getDataByDevice(dvId){
        return [{name:"address/tdms"}]
        // axios
        // .get(`${path}`, {params: { device: dvId }})
        // .then((res)=> res.data)
        // .catch(handleAxiosError)
    }
}

export {FileListService}
export default new FileListService()