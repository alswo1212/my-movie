import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';
import { MOVIE } from '@const/url';

const Poster = ({poster_url, movie_nm = '', isback = false}) => {
  const style = isback ? {
    filter:'blur(5px) brightness(0.5)',
    transform:'translate(0, -50%) rotateY(180deg)'
  } : {}
  return (
    <>
    {
      poster_url 
      ? <img className='center'
          src={poster_url} 
          alt={movie_nm} 
          style={style}/>
      : <div style={{
          background:'black', 
          width:'100%', 
          height:'100%',
          position: 'absolute',
        }}></div>
    }
    </>
  )
}

const MovieCard = ({...movie}) => {
  const navigate = useNavigate();
  const myMovies = new Set(localStorage.getItem('myMovies')?.split(',') ?? [])
  const goDetail = () => {
    if(!movie.movie_id)
      return;
    navigate(`${MOVIE}/${movie.movie_id}/${movie.movie_seq}`)
  }
  return <div className="flip-box">
  <div className="flip-box-inner">
    <div className="flip-box-front">
      <Poster {...movie} />
      <div style={{
        position:'absolute',
        right:6,
        top:6,
      }}>
        {myMovies.has(movie.movie_cd)
        ? <StarIcon className='star' />
        : <StarBorderIcon className='star' />}
      </div>
    </div>
    <div className="flip-box-back">
      <Poster {...movie} isback={true}/>
      <div className='card-info-wrap'>
        <div className='movie-title' onClick={goDetail}>
          {movie.movie_nm ?? ''}
        </div>
        {movie.director && <div className='movie-card-info'>{movie.director}</div>}
        {movie.open_dt && <div className='movie-card-info'>{`${movie.open_dt} 개봉`}</div>}
        {movie.audi_acc && <div className='movie-card-info'>{`누적 관객 ${Number(movie.audi_acc).toLocaleString()}명`}</div>}
        {movie.genre && <div className='movie-card-info'>{movie.genre}</div>}
        {movie.nation && <div className='movie-card-info'>{movie.nation}</div>}
        
      </div>
      <div style={{
        position:'absolute',
        right:6,
        top:6,
      }}>
        {myMovies.has(movie.movie_cd)
        ? <StarIcon className='star' />
        : <StarBorderIcon className='star' />}
      </div>
    </div>
  </div>
</div>
}
export default MovieCard