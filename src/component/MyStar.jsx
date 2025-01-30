import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { likesAtom } from '@util/atoms';
import { useAtom } from 'jotai';

const MyStar = ({movie_cd, movie_id, movie_seq}) => {
  const [likeList, setLikeList] = useAtom(likesAtom);
  const myMovies = new Set(likeList.map(data => data.movie_cd));

  const addLike = () => setLikeList([...likeList, {movie_cd, movie_id, movie_seq}]);
  const removeLike = () => setLikeList(likeList.filter(data => data.movie_cd != movie_cd));
  
  return myMovies.has(movie_cd)
      ? <StarIcon className='star' onClick={removeLike} />
      : <StarBorderIcon className='star' onClick={addLike} />;
};

export default MyStar;