import axios from "axios";

export const axiosMovies = axios.create({
    baseURL: 'https://www.kobis.or.kr',
    // timeout: 3000,
})

export const axiosPoster = axios.create({
    baseURL: 'https://api.koreafilm.or.kr',
    // timeout: 1000,
})