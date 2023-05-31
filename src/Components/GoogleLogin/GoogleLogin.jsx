import React from 'react';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const responseGoogle = (response) => {
    if (response && response.profileObj) {
      onSuccess(response.profileObj);
    } else {
      onFailure();
    }
  };

  return (
<></>
  );
};

export default GoogleLoginButton;
