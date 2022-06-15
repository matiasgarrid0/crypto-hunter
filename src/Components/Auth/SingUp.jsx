import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../Firebase";
import { CryptoState } from "../../Context";
import { GoogleButton } from "react-google-button";

export const SingUp = ({ handleClose }) => {
  const { setAlert } = CryptoState();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: "Acount created successfully!",
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

  const googleProvider = new GoogleAuthProvider();

  const singingWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Signup successfull. Wellcome ${res.user.displayName}`,
          type: "success",
        });
        console.log(res)
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      });
  };
  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        textAlign: "center",
      }}
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
      {password?.length > 0 && (
        <TextField
          variant="outlined"
          type="password"
          label="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
        />
      )}

      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        SING UP
      </Button>
      <div className="div-signup-google-button">
        <span>or</span>
        <GoogleButton
          type="dark"
          onClick={() => {
            singingWithGoogle();
            handleClose()
          }}
        />
      </div>
    </Box>
  );
};
