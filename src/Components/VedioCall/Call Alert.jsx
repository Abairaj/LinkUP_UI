import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Sound from "react-sound";
import ringtone from "../.././assets/Whatsapp.mp3";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSocket } from "../../SocketProvider";
import { useSelector } from "react-redux";
export default function CallAlert() {
  const [open, setOpen] = React.useState(true);
  const [ring, setRing] = React.useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const user = useSelector(state=>state.user);
  const socket = useSocket();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleReject = () => {
    setOpen(false);
    navigate(`/`);
  };

  const handleAccept = () => {
    setOpen(false);

    navigate(`/video_call_web/${id}`);
  };

  React.useEffect(() => {});

  return (
    <div>
      <Sound
        url={ringtone}
        playStatus={ring ? Sound.status.PLAYING : Sound.status.STOPPED}
      />
      <Dialog
        open={open}
        onClose={handleAccept}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have a call
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ backgroundColor: "red" }} onClick={handleReject}>
            Reject
          </Button>
          <Button
            sx={{ backgroundColor: "green" }}
            onClick={handleAccept}
            autoFocus
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
