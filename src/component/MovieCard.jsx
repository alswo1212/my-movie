import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const MovieCard = ({...movie}) => {
  const myMovies = new Set(localStorage.getItem('myMovies')?.split(',') ?? [])

  return <div className="flip-box">
  <div className="flip-box-inner">
    <div className="flip-box-front">
      <img className='center' 
        src={movie.poster_url} 
        alt={movie.movie_nm ?? ''} />
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
      <img className='center' 
        src={movie.poster_url} 
        alt={movie.movie_nm ?? ''} 
        style={{
          filter:'blur(5px) brightness(0.5)',
          transform:'translate(0, -50%) rotateY(180deg)'
        }}/>
      <div className='card-info-wrap'>
        <div className='movie-title'>
          {movie.movie_nm ?? ''}
        </div>
        <div className='movie-card-info'>
          {movie.open_dt && `${movie.open_dt} 개봉`}
        </div>
        <div className='movie-card-info'>
          {movie.audi_acc && `누적 관객 ${Number(movie.audi_acc).toLocaleString()}명`}
        </div>
        {/* <div className='movie-card-info'>
          {movie.audi_cnt && `${movie.audi_cnt}↑`}
        </div> */}
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