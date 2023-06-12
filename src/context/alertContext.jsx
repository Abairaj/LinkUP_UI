import { createContext, useState } from "react";

const AlertContext = createContext(null);

const AlertProvider = ({ children }) => {
  const [successAlert, setSuccessAlert] = useState(false);

  const showSuccessAlert = () => {
    setSuccessAlert(true);

    setTimeout(() => {
      setSuccessAlert(false);
    }, 3000);
  };

  const contextValue = {
    successAlert,
    showSuccessAlert,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContext, AlertProvider };
