import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
// import { StarIcon, StarBorderIcon } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useEffect, useState } from 'react';
import { getDailyMovie, getWeeklyMovie } from '@apis/movie';
import MovieCard from '@component/MovieCard';

const Home = () => {
  const [dailyMovies, setDailyMovies] = useState([])
  const [weeklyMovies, setWeeklyMovies] = useState([])
  
  useEffect(() => {
    const setDatas = async () => {
      const newDailyMovies = getDailyMovie()
      const newWeeklyMovies = getWeeklyMovie()
      setDailyMovies(await newDailyMovies)
      setWeeklyMovies(await newWeeklyMovies)
    }
    setDatas()
  },[])
  return (
    <>
      <Typography variant="h4" gutterBottom>일일 TOP 10</Typography>
      <div style={{
        display:'flex',
        flexWrap: 'wrap',
        gap:10
      }}>
        {dailyMovies.map(movie => <MovieCard key={movie.movie_cd} {...movie} />)}
      </div>
      <br />
      <Typography variant="h4" gutterBottom>지난주 TOP 10</Typography>
      <div style={{
        display:'flex',
        flexWrap: 'wrap',
        gap:10
      }}>
        {weeklyMovies.map(movie => <MovieCard key={movie.movie_cd} {...movie} />)}
      </div>
    </>
  )
}
export default Home