export default function TokenAuth() {
    try {
        const token: string|null = localStorage.getItem("user");
        let accessToken = null;
        if (token !== null) {
            const user = JSON.parse(token)
            accessToken = user.token
            return accessToken
        }
        return
    } catch (e) {
        return e;
    }
}
