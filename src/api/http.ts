import axios from "axios";
import type { AxiosError, AxiosResponse } from "axios";
const http = axios.create({
    baseURL: "https://3yya.com/u/a1e87c66d73b4ca3/word/app",
});
export default http;
export function handleApiError(
    error: AxiosError,
    callback: (response: AxiosResponse) => void
) {
    //先判断是否是axios的错误
    if (axios.isAxiosError(error)) {
        //在判断状态码是否400的错误
        if (error.response?.status === 400) {
            callback(error.response);
        }
    }
}
