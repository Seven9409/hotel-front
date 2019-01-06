import axios from 'axios';
import storage from "../common/Util"

// import storage from '@/utils/storage.js'

let userBase = 'http://192.168.31.60:8012';
let hotelBase = 'http://192.168.31.60:8013';
let AUTH_TOKEN = storage.getStorage('token')
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.timeout =  6000;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

export const requestLogin = params => {
    return axios.post(`${userBase}/login`, params).then(res => res.data);
};
export const requestRegister = params => {
    return axios.post(`${userBase}/user`, params).then(res => res.data);
};
export const hotelList = params => {
    return axios.get(`${hotelBase}/hotel`, {params: params});
};





//
// export const userFind = params => {
//     return axios.get(`${base}/user/find`, {params: params});
// };
// export const removeUser = pathValue => {
//     return axios.delete(`${base}/user/` + pathValue);
// };
// export const editUser = params => {
//     return axios.put(`${base}/user`, params).then(res => res.data);
// };
// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };
//
// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };
//
// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };
//
// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };
//
// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };
//
// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };