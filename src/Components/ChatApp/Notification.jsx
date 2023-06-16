import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSocket } from '../../SocketProvider';

export const NotificationsTrigger = () => {
  const [open, setOpen] = useState(false);
  const notification = useSelector((state) => state.notification);
  const socket = useSocket();

  useEffect(() => {
    console.log('useeffect working.............');
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data).message;
      if (message.event === 'notification') {
        setOpen(true);
      }
    };
  }, [notification]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%',position:'absolute',top:0,left:0 }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {notification}
        </MuiAlert>
      </Snackbar>
    </Stack>
  );
};
