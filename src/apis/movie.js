﻿import { axiosMovies, axiosPoster } from '@util/axios'
import { DAILY, WEEKLY, POSTER } from "@const/apiUrl"
import { getYesterday, getAWeekAgo } from "@util/day"
import { SEARCHMOVIELIST } from '../const/apiUrl'

const MOVIES_KEY = import.meta.env.VITE_MOVIE_KEY
const POSTER_KEY = import.meta.env.VITE_POSTER_KEY

export const getDailyMovie = async () => {
  const url = `${DAILY}?key=${MOVIES_KEY}&targetDt=${getYesterday()}`
  return getBoxOffice(url, 'dailyBoxOfficeList');
}

export const getWeeklyMovie = async () => {
  const url = `${WEEKLY}?key=${MOVIES_KEY}&targetDt=${getAWeekAgo()}&weekGb=0`
  return getBoxOffice(url, 'weeklyBoxOfficeList');
}

const getBoxOffice = async (url, resultList) => {
  const { data } = await axiosMovies.get(url);
  const newMovies = data.boxOfficeResult[resultList].map(movie => ({
    rank: movie.rank, // 순위
    movie_cd: movie.movieCd, // 영화 코드
    movie_nm: movie.movieNm, // 영화명
    open_dt: movie.openDt, // 개봉일
    audi_acc: movie.audiAcc, // 누적관객수
    audi_cnt: movie.audiCnt, // 해당 관객수
  }));

  await setPoster(newMovies);
  return newMovies
}

const setPoster = async (movies) => {
  const response = await Promise.all(
    movies.map(({ movie_nm, open_dt }) => {
      const url = `${POSTER}?collection=kmdb_new2&ServiceKey=${POSTER_KEY}&title=${movie_nm}&releaseDts=${open_dt.replaceAll('-', '')}`
      return axiosPoster.get(url)
    }));
  response.forEach((rep, i) => {
    const datas = rep.data.Data;
    if (datas && datas.length) {
      const results = datas[0].Result;
      if (results && results.length) {
        const posterUrl = results[0].posters.split('|')[0]
        movies[i].poster_url = posterUrl
        movies[i].director = results[0].directors.director[0].directorNm
      }
    }
  });
}

export const getSearchMovies = async (searchText, param = 'title', page = 0) => {
  const url = `${SEARCHMOVIELIST}?collection=kmdb_new2&detail=Y&ServiceKey=${POSTER_KEY}&${param}=${searchText}&use=극장용&listCount=10&startCount=${page * 10}`;
  const { data: { Data } } = await axiosPoster.get(url);
  const Result = Data[0].Result;
  if (!Result) {
    return [];
  }
  const result = Result.map(movie => ({
    movie_cd: movie.CommCodes.CommCode[0].CodeNo, // 영화 코드
    movie_nm: movie.titleEtc.split('^')[0], // 영화명
    nation: movie.nation, // 나라
    genre: movie.genre, // 장르
    poster_url: movie.posters.split('|')[0], // 포스터 이미지 url
    movie_id: movie.movieId,
    movie_seq: movie.movieSeq,
    director: movie.directors.director[0].directorNm.replaceAll(' !HS ', '').replaceAll(' !HE ', ''),
  }));

  return result;
}