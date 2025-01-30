import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { likesAtom, loginModalOpenAtom, userAtom } from '@util/atoms';
import { useAtom } from 'jotai';

const MyStar = ({movie_cd, movie_id, movie_seq}) => {
  const [likeList, setLikeList] = useAtom(likesAtom);
  const [user, setUser] = useAtom(userAtom);
  const [modalOpen, setMdalOpen] = useAtom(loginModalOpenAtom);
  const myMovies = new Set(likeList.map(data => data.movie_cd));

  // const addLike = () => 
  // const removeLike = () => 

  return myMovies.has(movie_cd)
      ? <StarIcon className='star' onClick={e => {
        if (!user) {
          setMdalOpen(true);
          return;
        }
        setLikeList(likeList.filter(data => data.movie_cd != movie_cd));
      }} />
      : <StarBorderIcon className='star' onClick={e => {
        if (!user) {
          setMdalOpen(true);
          return;
        }
        setLikeList([...likeList, {movie_cd, movie_id, movie_seq}]);
      }} />;
};

export default MyStar;