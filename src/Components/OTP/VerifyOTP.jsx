import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './verifyotp.scss';

export default function VerifyOTP() {
  return (
    <div className='verify-otp'>
      <div className='center-content'>
        <TextField
          className='otp-input'
          label='Your OTP here'
          variant='outlined'
          placeholder='Enter OTP'
        />
        <Button variant='contained' className='verify-button'>
          Verify
        </Button>
      </div>
    </div>
  );
}
