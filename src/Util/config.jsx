import axios from "axios";
import {history} from '../index';

export const DOMAIN = 'https://shop.cyberlearn.vn';
export const USER_LOGIN = 'userLogin';
export const USER_PROFILE = 'userProfile';
export const PRODUCT_CART = 'cart';
export const TOKEN = 'accessToken';

export const http = axios.create({
    baseURL: DOMAIN, 
    timeout: 30000 
});

export const {saveStorageJSON,getStorageJSON,clearStorage} = {
    saveStorageJSON: (name,data) => {
        const string = JSON.stringify(data);
        localStorage.setItem(name,string);
    },
    getStorageJSON: (name) => {
        if(localStorage.getItem(name)) {
            const data = JSON.parse(localStorage.getItem(name));
            return data;
        }
        return undefined;
    },
    clearStorage:(name) => {
        localStorage.removeItem(name)
    }
}

http.interceptors.request.use((config)=>{
    config.headers = {...config.headers}
    let token = getStorageJSON(USER_LOGIN)?.accessToken;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
},(err) => {
    return Promise.reject(err);
});


http.interceptors.response.use((res)=>{
    return res;
},(err) => {
    if(err.response?.status === 401) {
        alert('Đăng nhập để vào trang này!');
        history.push('/login');
    }
    return Promise.reject(err)
});