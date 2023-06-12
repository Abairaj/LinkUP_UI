import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Sound from 'react-sound';
import ringtone from '../../assets/Whatsapp.mp3';

const CallAlert = ({ username }) => {
  const [playSound, setPlaySound] = useState(false);
  const handleEvent = () => {
    setPlaySound(true);
  };

  useEffect(() => {
    handleEvent();
    setOpen(true);
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Sound
        url={ringtone}
        playStatus={playSound ? Sound.status.PLAYING : Sound.status.STOPPED}
        playFromPosition={300 /* in milliseconds */}
      />

      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Incoming Call</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {username} is calling you.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Reject</Button>
          <Button onClick={handleClose} autoFocus>
            Answer
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default CallAlert;
