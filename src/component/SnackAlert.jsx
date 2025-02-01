import { Alert, Snackbar } from "@mui/material";

const SnackAlert = ({open, close, message, autoHideDuration = 2000}) => {
  return <Snackbar 
    open={open}
    autoHideDuration={autoHideDuration}
    onClose={e => close && close()}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <Alert severity="warning" onClose={e => close && close()}>
      {message}
    </Alert>
  </Snackbar>
};

export default SnackAlert;