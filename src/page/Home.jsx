import { Skeleton, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { getDailyMovie, getWeeklyMovie } from '@apis/movie';
import MovieCard from '@component/MovieCard';
import styled from 'styled-components';

const CardSkeleton = styled(Skeleton)`
  flex-basis: 19%;
  aspect-ratio: 17/23;
  border-radius: 10px;
  height: auto !important;
`

const Home = () => {
  const [dailyMovies, setDailyMovies] = useState(Array.from({length:10}));
  const [weeklyMovies, setWeeklyMovies] = useState(Array.from({length:10}));
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const setDatas = async () => {
      const newDailyMovies = getDailyMovie();
      const newWeeklyMovies = getWeeklyMovie();
      setDailyMovies(await newDailyMovies);
      setWeeklyMovies(await newWeeklyMovies);
      setIsLoading(false);
    };
    setDatas();
  },[])
  return (
    <>
      <br /><br />
      <Typography variant="h4" gutterBottom fontFamily={'GmarketSansBold'}>일일 TOP 10</Typography>
      <div style={{
        display:'flex',
        flexWrap: 'wrap',
        gap:10
      }}>
        {isLoading
        ? dailyMovies.map(_ => <CardSkeleton variant='rectangular' />)
        : dailyMovies.map(movie => <MovieCard key={movie.movie_cd} {...movie} />)}
      </div>
      <br /><br />
      <br /><br />
      <Typography variant="h4" gutterBottom fontFamily={'GmarketSansBold'}>지난주 TOP 10</Typography>
      <div style={{
        display:'flex',
        flexWrap: 'wrap',
        gap:10
      }}>
        {isLoading
        ? weeklyMovies.map(_ => <CardSkeleton variant='rectangular' />)
        : weeklyMovies.map(movie => <MovieCard key={movie.movie_cd} {...movie} />)}
      </div>
    </>
  )
}
export default Home