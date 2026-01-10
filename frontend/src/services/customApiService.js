import axios from 'axios';
import { useMemo } from "react"


const CustomApiServices=()=>{


const customApiService = useMemo(() => {


    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true, // Include cookies in requests
    })

    // instance.interceptors.response.use(
    //     (response) => response,
    //     (error) => {
    //         const errorMessage =
    //             error.response?.data?.message || "Something went wrong!";
    //         return Promise.reject(new Error(errorMessage));
    //     }
    // );
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            return Promise.reject({
                message: error.response?.data?.message || "Something went wrong!",
                status: error.response?.status,
                data: error.response?.data,
                headers: error.response?.headers,
                config: error.config,
            });
        }
    );

    return instance;

})



}



const customApiService = useMemo(() => {


    const instance = axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true, // Include cookies in requests
    })

    // instance.interceptors.response.use(
    //     (response) => response,
    //     (error) => {
    //         const errorMessage =
    //             error.response?.data?.message || "Something went wrong!";
    //         return Promise.reject(new Error(errorMessage));
    //     }
    // );
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            return Promise.reject({
                message: error.response?.data?.message || "Something went wrong!",
                status: error.response?.status,
                data: error.response?.data,
                headers: error.response?.headers,
                config: error.config,
            });
        }
    );

    return instance;

})






