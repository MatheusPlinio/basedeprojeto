import axios from "axios";
import TokenAuth from "@/hooks/TokenAuth";
export const HttpGET = async (route: string) => {
    try {
        const response = await axios.get(route, {
            headers: {
                Authorization: `Bearer ${TokenAuth()}`
            }
        })
        return response.data
    } catch (e) {
        throw new Error('Error HttpGET')
    }
}