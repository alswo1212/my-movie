import { axiosApi } from "@util/axios";

export const like = (email, movie_cd, movie_id, movie_seq) => {
  return axiosApi.post('/api/likes/', {
    email, movie_cd, movie_id, movie_seq
  });
}

export const unLike = (email, movie_cd) => {
  return axiosApi.delete("/api/likes/", {
    data: { email, movie_cd }
  })
}