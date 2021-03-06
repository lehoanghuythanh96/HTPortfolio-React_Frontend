import {apiUrl, fileUploadApi} from "./environments";
import {toggleSnackbar} from "../components/UI_Components/UI_Snackbar";

const axios = require("axios");

export const apiPostData = async (urlsuffix: string, data: any) => {

    return await axios.post(`${apiUrl}/${urlsuffix}`, data, {
        timeout: 5000,
        withCredentials: true
    })

}

export const apiPostFile = async (urlsuffix: string, data: any) => {

    return await axios.post(`${fileUploadApi}/${urlsuffix}`, data, {
        timeout: 10000,
        withCredentials: true
    })

}

axios.interceptors.response.use(
    (res: any) => {
        if (res.data) {
            if (res.data.message) {
                toggleSnackbar.next(res.data.message)
            }
        }
        return res
    }, async (error: any) => {
        if (error.config && error.response) {
            if (error.response.status === 401) {
                let refresher = await refreshToken()
                if (refresher.status === 200) {
                    let newToken = refresher.data.access_token
                    let newBearer = `Bearer ${newToken}`
                    let resCheck = await verifyToken(newToken)
                    if (resCheck.status === 200) {
                        error.config.headers.Authorization = newBearer
                        return axios.request(error.config);
                    } else {
                        return Promise.reject(resCheck.data);
                    }
                }
                if (refresher.status === 401) {
                    return Promise.reject(refresher);
                }
            }
            if (error.response.status === 404) {
                let msg = "Url not found"
                toggleSnackbar.next(msg)
            }
            console.log(error.response)
            if (error.response.data && error.response.data.message) {
                let msg = error.response.data.message
                toggleSnackbar.next(msg)
            }
            if (error.response.data && error.response.data.detail) {
                let msg = error.response.data.detail
                toggleSnackbar.next(msg)
            }
            return Promise.reject(error.response);
        } else {
            console.log(error)
            return Promise.reject(error);
        }
    });

export const verifyToken = async (newToken: string) => {
    const checker = axios.create({
        baseURL: apiUrl,
        timeout: 5000,
        withCredentials: true
    })
    let resCheck = await checker.post(`auth/token/verify/`,{token: newToken})
        .then((res: any) => res).catch((error: any) => error.response)
    return resCheck
}

export const refreshToken = async () => {

    const getRefresher = axios.create({
        baseURL: apiUrl,
        timeout: 5000,
        withCredentials: true
    })

    return await getRefresher.post(`auth/token/refresh/`, {}).then(
        (res: any) => {
            if(res.data && res.data.access_token) {
                let newToken = res.data.access_token
                let newBearer = `Bearer ${newToken}`
                axios.defaults.headers.common['Authorization'] = newBearer;
            }
            return res
        }
    ).catch(
        (error: any) => {
            if (error.response) {
                console.log(error.response)
                return error.response
            } else {
                console.log(error)
                return error
            }
            return error
        }
    )
}