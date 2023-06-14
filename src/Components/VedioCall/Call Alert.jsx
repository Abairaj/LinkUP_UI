import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Sound from 'react-sound';
import ringtone from '../.././assets/Whatsapp.mp3';
import { useNavigate, useParams } from 'react-router-dom';
export default function CallAlert() {
  const [open, setOpen] = React.useState(true);
  const [ring,setRing] = React.useState(true);
  const navigate = useNavigate();
  const {id} = useParams()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate(`/video_call_web/${id}`)
  };

  React.useEffect(()=>{
    setTimeout(() => {
      setOpen(false)
      // setRing(false);
    }, 5000);
  })

  return (
    <div>
<Sound url={ringtone} playStatus={ring ? Sound.status.PLAYING : Sound.status.STOPPED} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}