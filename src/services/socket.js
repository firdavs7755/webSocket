import axios from "axios";

const api='https://test.gopharm.uz/api/v1/chat/threads?region=1';
let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NywidXNlcm5hbWUiOiJtZXNzYWdlcyIsImV4cCI6MTY1ODk5ODU5MywiZW1haWwiOiIifQ.E7iEQstxQRHXdhhVdu3K7A-urdB8OFaKks5J6AsCJh0';

let axiosInstance = axios.create({
    baseURL : `${api}`,
});
axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + token;

export const socketService={
    getUsers:()=>{
        return axiosInstance.get();
    }
}