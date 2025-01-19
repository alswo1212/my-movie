import axios from "axios";

export const axiosMovies = axios.create({
    baseURL: 'http://www.kobis.or.kr',
    // timeout: 3000,
})

export const axiosPoster = axios.create({
    baseURL: 'http://api.koreafilm.or.kr',
    // timeout: 1000,
})