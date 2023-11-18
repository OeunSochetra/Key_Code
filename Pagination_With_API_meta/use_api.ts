import api from "./api"

export class AdvertisementApi {
    static async getAdvertisement (query?:any)  {
        try {
            const response = await api.get(`/ads/advertise`,{params:query})
            // return {isSuccess : true ,data:response.data.data}
            const {data} = response.data
            const meta = response.data.meta
            return { isSuccess : true , data,meta}
        } catch (e:any) {
            return {isSuccess :false, message: e.response?.data?.data}
        }
    }
}