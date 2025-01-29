import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const MyStar = ({movie_cd}) => {
  const myMovies = new Set(localStorage.getItem('myMovies')?.split(',') ?? []);
  return myMovies.has(movie_cd)
      ? <StarIcon className='star' />
      : <StarBorderIcon className='star' />;
};

export default MyStar;