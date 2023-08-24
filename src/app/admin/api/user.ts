import axios from "axios";
import TokenAuth from "@/hooks/TokenAuth";
import {HttpGET} from "@/hooks/ApiHttp";

export interface UserAccess {
    id: number;
    name: string;
    email: string;
    password: string;
}

export async function UserFetch(): Promise<UserAccess[]> {
    try {
        let host = process.env.NEXT_API_ROUTE

        const data = await HttpGET('http://localhost:8000/api/user')
        return data;
    } catch (error) {
        throw new Error('Error for fetchDataAccess');
    }
}