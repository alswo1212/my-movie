import { axiosApi } from "@util/axios";

export const login = (email, password) => axiosApi.post("/api/users/", { email, password });