import { Modal, Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import { useAtom } from "jotai";
import { userAtom, loginModalOpenAtom, likesAtom } from "@util/atoms";
import { useState } from "react";
import { login } from "@apis/user";

const LoginModal = () => {
  const [modalOpen, setModalOpen] = useAtom(loginModalOpenAtom);
  const [user, setUser] = useAtom(userAtom)
  const [likes, setLikes] = useAtom(likesAtom)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleClose = () => setModalOpen(false);
  const handleOpen = () => setModalOpen(true);
  const snackbarClose = () => setSnackbarOpen(false);
  const clickLoginButton =  async () => {
    console.log(email, password);
    
    if(!email.trim() || !password){
      setSnackbarOpen(true);
      setSnackbarMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    const {data} = await login(email, password);
    if(data.message){
      setSnackbarMessage(data.message);
      setSnackbarOpen(true);
      return;
    }
    
    setUser({email});
    setLikes(data.likes);
    setModalOpen(false);
  }

  const logout = () => {
    setUser(null);
    setLikes([]);
  }

  return (
    <div>
      {/* 로그인 버튼 */}
      {user 
      ? <div style={{
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
        gap:10,
      }}>
        <div>
          <div>{user.email}</div>
          <div>님 안녕하세요.</div>
        </div>
        <div>
        </div>
          <Button variant="contained" color="error" onClick={logout}>
            로그아웃
          </Button>
        </div> 
      : <Button variant="contained" color="primary" onClick={handleOpen}
          style={{float:'right'}}>
        로그인
      </Button>
      }

      {/* 로그인 모달 */}
      <Modal open={modalOpen} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" component="h2" textAlign="center">
            로그인
          </Typography>
          <TextField
            label="이메일"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="비밀번호"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button onClick={handleClose} color="secondary">
              취소
            </Button>
            <Button onClick={clickLoginButton} color="primary" variant="contained">
              로그인
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar 
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={snackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="warning" onClose={snackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginModal;