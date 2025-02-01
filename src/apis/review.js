import { axiosApi } from '@util/axios';

export const getReviews = async (movie_cd) => {
  const { data } = await axiosApi.get(`/api/reviews/${movie_cd}`);
  return data;
}

export const postReview = async ({ content, writer, movie_cd }) => {
  const { data } = await axiosApi.post(`/api/reviews/${movie_cd}`, { content, writer });
  return data;
}

export const putReview = async ({ _id, movie_cd, content }) => {
  const { data } = await axiosApi.put(`/api/reviews/${movie_cd}/${_id}`, { content });
  return data;
}

export const deleteReview = async ({ movie_cd, _id }) => {
  const { data } = await axiosApi.delete(`/api/reviews/${movie_cd}/${_id}`);
  return data;
}