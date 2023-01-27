import http from "./http";
interface ApiSignUp {
    token: string;
}
interface ApiLogin {
    token: string;
}
interface ApiSelfInfo {
    token: string;
}
export async function signUp(
    username: string,
    password: string
): Promise<ApiSignUp> {
    const response = await http.post("/users", {
        username,
        password,
    });
    return response.data;
}
export async function login(
    username: string,
    password: string
): Promise<ApiLogin> {
    const response = await http.post("/tokens", {
        username,
        password,
    });
    return response.data;
}
export async function fetchSelfInfo(): Promise<ApiSelfInfo> {
    const response = await http.get("/user/info");
    console.log(1);
    return response.data;
}
