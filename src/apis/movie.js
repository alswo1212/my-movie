import { axiosMovies, axiosPoster } from '@util/axios'
import { DAILY, WEEKLY, POSTER } from "@const/url"
import { getYesterday, getAWeekAgo } from "@util/day"

const MOVIES_KEY = import.meta.env.VITE_MOVIE_KEY
const POSTER_KEY = import.meta.env.VITE_POSTER_KEY

const dayOrWeek = {
  'D': {
    prefix: DAILY,
    resultList: 'dailyBoxOfficeList',
    getTargetDt: getYesterday,
  },
  'W': {
    prefix: WEEKLY,
    resultList: 'weeklyBoxOfficeList',
    getTargetDt: getAWeekAgo,
  },
}
export const getDailyMovie = async () => {
  return getMovies('D');
}

export const getWeeklyMovie = async () => {
  return getMovies('W');
}

const getMovies = async (div) => {
  const { prefix, resultList, getTargetDt } = dayOrWeek[div]
  let url = `${prefix}?key=${MOVIES_KEY}&targetDt=${getTargetDt()}`
  if (div === 'W')
    url += `&weekGb=0`
  const { data } = await axiosMovies.get(url);
  const newMovies = data.boxOfficeResult[resultList].map(movie => ({
    rank: movie.rank, // 순위
    movie_cd: movie.movieCd, // 영화 코드
    movie_nm: movie.movieNm, // 영화명
    open_dt: movie.openDt, // 개봉일
    audi_acc: movie.audiAcc, // 누적관객수
    audi_cnt: movie.audiCnt, // 해당 관객수
  }));

  const response = await Promise.all(
    newMovies.map(({ movie_nm, open_dt }) => {
      const url = `${POSTER}?collection=kmdb_new2&ServiceKey=${POSTER_KEY}&title=${movie_nm}&releaseDts=${open_dt.replaceAll('-', '')}`
      return axiosPoster.get(url)
    }));
  response.forEach((rep, i) => {
    const posterUrl = rep.data.Data[0]?.Result[0].posters.split('|')[0]
    newMovies[i].poster_url = posterUrl ?? ''
  });
  return newMovies
}