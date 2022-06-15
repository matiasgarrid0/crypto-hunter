import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { CryptoState } from "../../Context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";

export const Longin = ({ handleClose }) => {
  const { setAlert } = CryptoState();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
        type: "error",
      });
    }
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      setAlert({
        open: true,
        message: `Login successful. Wellcome ${res.user.email}`,
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        LOGIN
      </Button>
    </Box>
  );
};
