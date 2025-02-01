import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { likesAtom, loginModalOpenAtom, isLoginAtom } from '@util/atoms';
import { useAtom } from 'jotai';
import { unLike, like } from '@apis/like';

const MyStar = ({movie_cd, movie_id, movie_seq, size = 1.5}) => {
  const [likeList, setLikeList] = useAtom(likesAtom);
  const [modalOpen, setMdalOpen] = useAtom(loginModalOpenAtom);
  const [isLogin, setIsLogin] = useAtom(isLoginAtom);
  const myMovies = new Set(likeList.map(data => data.movie_cd));
  const email = sessionStorage.getItem('email');

  const addLike = async () => {
    const {data} = await like(email, movie_cd, movie_id, movie_seq);
    setLikeList(data.likes);
    sessionStorage.setItem('likes', JSON.stringify(data.likes));
  }
  const removeLike = async () => {
    await unLike(email, movie_cd);
    const likes = likeList.filter(data => data.movie_cd != movie_cd);
    setLikeList(likes);
    sessionStorage.setItem('likes', JSON.stringify(likes));
  }

  return myMovies.has(movie_cd)
    ? <StarIcon className='star' style={{
        width:`${size}em`,
        height:`${size}em`
      }}
        onClick={e => {
          if (!(isLogin && email)) {
            setMdalOpen(true);
            return;
          }
          removeLike();
        }} />
    : <StarBorderIcon className='star' style={{
        width:`${size}em`,
        height:`${size}em`
      }}
        onClick={e => {
          if (!(isLogin && email)) {
            setMdalOpen(true);
            return;
          }
          addLike();
        }} />;
};

export default MyStar;