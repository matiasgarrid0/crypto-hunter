import React from "react";
import { Alert, Stack, Snackbar } from "@mui/material";
import { CryptoState } from "../../Context";

export const Alerts = () => {
  const { alert, setAlert } = CryptoState();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false });
  };
  return (
    <div>
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert
            variant="filled"
            severity={alert.type}
            onClose={handleClose}
            elevation={10}
          >
            {alert.message}
          </Alert>
        </Stack>
      </Snackbar>
    </div>
  );
};
