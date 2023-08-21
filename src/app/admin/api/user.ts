import axios from "axios";

export interface UserAccess {
    id: number;
    name: string;
    email: string;
    password: string;
}

export async function UserFetch(): Promise<UserAccess[]> {
    try {
        const token = localStorage.getItem('user')

        console.log('teste', token)

        const response = await axios.get<UserAccess[]>('http://localhost:8000/api/admin/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error for fetchDataAccess');
    }
}