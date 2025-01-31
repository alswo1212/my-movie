import { useAtom } from "jotai"
import { useEffect, useState } from "react";
import { likesAtom } from "@util/atoms"
import { getMovieByIdAndSeq } from "@apis/movie";
import { Typography } from "@mui/material";
import MovieCard from "@component/MovieCard"

const LikeMovie = () => {
  const [likes, setLikes] = useAtom(likesAtom);
  const [likeMovieObj, setLikeMovieObj] = useState({});
  
  useEffect(() => {
    const promisses = likes.map(({movie_id, movie_seq, movie_cd}) => getMovieByIdAndSeq(movie_id, movie_seq, movie_cd))
    Promise.all(promisses).then(rep => {
      const genreThenMovies = rep.reduce((obj, movie) => {
        movie.genre.split(',').forEach(el => {
          if (!obj.hasOwnProperty(el)) 
            obj[el] = [];
          
          obj[el].push(movie);
        });
        return obj;
      }, {});

      setLikeMovieObj(genreThenMovies);
    })
  }, []);
  return (
    <div>
      <br />
      {Object.keys(likeMovieObj).length == 0
      ? <Typography variant="h4" gutterBottom fontFamily={'GmarketSansBold'}>나의 영화목록이 비어있습니다.</Typography>
      : Object.entries(likeMovieObj).map(([genre, movies]) => <>
        <Typography variant="h4" gutterBottom fontFamily={'GmarketSansBold'}>{genre}</Typography>
        <div style={{
          display:'flex',
          flexWrap: 'wrap',
          gap:10
        }}>
          {movies.map(movie => <MovieCard key={movie.movie_cd} {...movie} />)}
        </div>
        <br /><br /><br />
      </>)}
    </div>
  )
}

export default LikeMovie