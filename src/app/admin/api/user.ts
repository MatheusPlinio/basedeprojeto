import axios from "axios";
import TokenAuth from "@/hooks/TokenAuth";

export interface UserAccess {
    id: number;
    name: string;
    email: string;
    password: string;
}

export async function UserFetch(): Promise<UserAccess[]> {
    try {
        const response = await axios.get<UserAccess[]>('http://localhost:8000/api/user', {
            headers: {
                Authorization: `Bearer ${TokenAuth()}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error for fetchDataAccess');
    }
}