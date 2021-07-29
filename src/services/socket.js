import axios from "axios";

const api='https://test.gopharm.uz/api/v1/chat';
const chatApi = 'https://test.gopharm.uz/api/v1/chat'
let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NywidXNlcm5hbWUiOiJtZXNzYWdlcyIsImV4cCI6MTY1ODk5ODU5MywiZW1haWwiOiIifQ.E7iEQstxQRHXdhhVdu3K7A-urdB8OFaKks5J6AsCJh0';
let userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NywidXNlcm5hbWUiOiJtZXNzYWdlcyIsImV4cCI6MTY1OTE2MTU4OSwiZW1haWwiOiIifQ._1nOd-cHABes6yhvgkvrJijIpK51y5mmjMbxyU9MPjI';
let axiosInstance = axios.create({
    baseURL : `${api}`,
});
let axiosInstance2 = axios.create({
    baseURL : `${api}`,
});
axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + token;
axiosInstance2.defaults.headers.common['Authorization'] = "Bearer " + userToken;

export const socketService={
    getUsers:()=>{
        return axiosInstance.get('/threads?region=1');
    },
    getChatList:(chatId)=>{
        return axiosInstance.get(`/messages?thread=${chatId}&region=1`)
    }
}