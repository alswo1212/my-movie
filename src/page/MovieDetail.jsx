import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getMovieByIdAndSeq } from "@apis/movie";
import { Typography } from "@mui/material";
import styled from "styled-components";

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
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const setData = async () => {
      const data = await getMovieByIdAndSeq(movieId, movieSeq);
      if(data)
        setMovie(data);
    }
    setData()
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
          <div>
            <img src={movie.poster_url} alt={movie.poster_url ? movie.movie_nm : '포스터 정보가 없습니다.'} style={{
              width:'100%',
              borderRadius:20,
              boxShadow: '0 0 10px 0 #666',
            }}/>
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
      <div>
        리뷰자리
      </div>
      </>
      }
    </div>
  )
}

export default MovieDetail
