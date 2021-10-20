import axios from "axios";

class DataService {
    async getDataByDevice(dvId){
        return axios
        .get(`${path}`, {params: { device: dvId }})
        .then((res)=> res.data)
        .catch(handleAxiosError)
    }
}

export {DataService}
export default new DataService()