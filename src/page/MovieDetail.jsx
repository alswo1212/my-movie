import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom"
import { getMovieByIdAndSeq } from "@apis/movie";
import { Typography } from "@mui/material";
import styled from "styled-components";
import MyStar from "@component/MyStar";
import Review from "@component/Review";
import ReviewInput from "@component/ReviewInput";
import { getReviews } from "@apis/review";

const MovieInfo = styled.div`
  ${props => props.infoname && `
    &::before{
      content: '${props.infoname}';
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      line-height: 1.75;
      min-width: 64px;
      border-radius: 4px;
      border: 1px solid rgba(25, 118, 210, 0.5);
      color: #1976d2;
      padding-inline: 8px;
      margin-right: 10px;
    }
  `}
  &>p{
    font-family: 'RIDIBatang', sans-serif;
    padding-left: 10px;
  }
  &>span{
    display: block;
    margin: 10px 0;
    padding-left: 10px;
  }
`

const MovieDetail = () => {
  const {movieId, movieSeq} = useParams();
  const [queryString, setQueryString] = useSearchParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  const movieCd = queryString.get('code');

  useEffect(() => {
    const setData = async () => {
      const moviePromise = getMovieByIdAndSeq(movieId, movieSeq, movieCd);
      const reviewPromise = getReviews(movieCd);
      const gotMovie = await moviePromise;
      const reviewList = await reviewPromise;
      
      setMovie(gotMovie);
      setReviews(reviewList);
    }
    setData();
  }, [])
  return (
    <div>
      <br/>
      {movie &&
      <>
      <div style={{display:'flex', gap:30}}>
        <div style={{
          flexBasis:'50%',
          textAlign:'center'
        }}>
          <div style={{position:'relative'}}>
            <img src={movie.poster_url} alt={movie.poster_url ? movie.movie_nm : '포스터 정보가 없습니다.'} style={{
              width:'100%',
              borderRadius:20,
              boxShadow: '0 0 10px 0 #666',
            }}/>
            <div style={{
              position:'absolute',
              top:10,
              right:10
            }}>

              <MyStar movie_cd={movie?.movie_cd} 
                movie_id={movieId} 
                movie_seq={movieSeq}
                size={2.2}/>
            </div>
          </div>
        </div>
        <div style={{
          display:'flex', 
          flexDirection:'column', 
          gap:10,
          flexBasis:'50%',
        }}>
          <Typography variant="h4" gutterBottom fontFamily={'GmarketSansBold'}>{movie.movie_nm}</Typography>
          <MovieInfo infoname={'감독'}>
            <span>{movie.directors.map(d => d.directorNm).join(', ')}</span>
          </MovieInfo>
          <MovieInfo infoname={'출연진'}>
            <span>{movie.actors.filter((_, i) => i < 10).map(d => d.actorNm).join(', ')}</span>
          </MovieInfo>
          <MovieInfo infoname={'장르'}>
            <span>{movie.genre}</span>
          </MovieInfo>
          <MovieInfo infoname={'줄거리'}>
            <p style={{lineHeight: '1.5em'}}>{movie.plot}</p>
          </MovieInfo>
        </div>
      </div>
      <div style={{position:'relative'}}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap:15,
          marginBottom:15,
        }}>
          {reviews.map(rv =><Review {...rv} setReviews={setReviews}/>)}
        </div>
        <ReviewInput setReviews={setReviews} movie_cd={movie.movie_cd} />
      </div>
      </>
      }
    </div>
  )
}

export default MovieDetail
