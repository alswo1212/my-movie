import { axiosApi } from '@util/axios';

export const getReviews = async (movie_cd) => {
  const { data } = await axiosApi.get(`/api/riview/${movie_cd}`);
  return data;
}

export const postReview = async ({ content, writer }) => {
  const { data } = await axiosApi.post(`/api/riview/${movie_cd}`, { content, writer });
  return data;
}

export const putReview = async ({ id, content }) => {
  const { data } = await axiosApi.put(`/api/riview/${id}`, { content });
  return data;
}

export const deleteReview = async (id) => {
  const { data } = await axiosApi.delete(`/api/riview/${id}`);
  return data;
}