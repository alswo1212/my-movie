import { Button, Card, CardContent, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { useState } from "react";
import { isLoginAtom } from "@util/atoms";
import { postReview } from "@apis/review";
import SnackAlert from "@component/SnackAlert";

const ReviewInput = ({setReviews, movie_cd}) => {
  const [content, setContent] = useState('');
  const [isLogin, setIsLogin] = useAtom(isLoginAtom);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const email = sessionStorage.getItem('email');

  const addReview = async () => {
    if (!content.trim()) {
      setSnackbarOpen(true);
      return;
    }
    setReviews(await postReview({content, movie_cd, writer:email}));
    setContent('');
  }

  return (
    <>
    {
      (isLogin && Boolean(email)) &&
      <Card sx={{position:'sticky', bottom:10}}>
        <CardContent sx={{
          display:'flex',
          justifyContent: 'space-around',
        }}>
          <TextField 
            value={content}
            size="medium"
            placeholder="감상평을 입력해주세요"
            onChange={e => setContent(e.target.value)}
            sx={{width:`85%`}}
            rows={3}
            multiline
          />
          <Button size="large" variant="contained" onClick={addReview}>댓글 입력</Button>
          <SnackAlert message='감상평을 입력해주세요' open={snackbarOpen} close={() => setSnackbarOpen(false)}/>
        </CardContent>
      </Card>
    }
    </>
  );
}

export default ReviewInput;