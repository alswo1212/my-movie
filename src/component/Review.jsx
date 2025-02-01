import { useState } from "react";
import { putReview, deleteReview } from "@apis/review";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import ClearIcon from '@mui/icons-material/Clear';
import { useAtom } from "jotai";
import { isLoginAtom } from "@util/atoms";

const StyledCard = styled(Card)({
  padding: "10px",
  borderRadius: "12px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  wordBreak:'break-all',
  position: 'relative',
  '&>div': {
    paddingBottom:'10px !important'
  }
});

const Review = ({_id, content, writer, setReviews, movie_cd}) => {
  const [updatedContent, setUpdatedContent] = useState(content);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLogin, setIsLogin] = useAtom(isLoginAtom);
  const email = sessionStorage.getItem('email');

  const updateReview = async (e) => {
    const reviews = await putReview({_id, movie_cd, content:updatedContent});
    setReviews(reviews);
    setIsUpdating(false);
  };

  const removeReview = async (e) => {
    const reviews = await deleteReview({_id, movie_cd});
    setReviews(reviews);
  }

  const cancelUpdate = () => {
    setUpdatedContent(content);
    setIsUpdating(false);
  }

  return (
    <StyledCard>
      <CardContent>
        {writer === email && 
        <ClearIcon fontSize="medium" sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          fill: '#aaa',
          cursor: 'pointer',
        }} onClick={removeReview}/>
        }
        <Typography variant="p" fontWeight="bold">
          {writer}
        </Typography>
        {isUpdating
        ? <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
          sx={{ mt: 1 }}
        />
        :
        <Typography variant="body1" sx={{ mt: 1 }}>
          {content}
        </Typography>
        }
        { isLogin && writer === email &&
        <div style={{textAlign:'right'}}>
          {isUpdating
          ?<>
          <Button onClick={updateReview}>수정</Button>
          <Button color="error" onClick={cancelUpdate}>취소</Button>
          </>
          : <Button onClick={e => setIsUpdating(true)}>수정</Button>
          }
        </div>
        }
      </CardContent>
    </StyledCard>
  )
};

export default Review;