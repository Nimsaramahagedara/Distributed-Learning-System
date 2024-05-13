import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Link from '@mui/material/Link';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { apiUrl } from "../../utils/Constants";
import Logo from "../../assets/Logo";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [buttonDisable, setBtnDisabled] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBtnDisabled(true);
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const isLoggedin = await axios.post(`${apiUrl}/user/login`, payload);
      console.log(isLoggedin);
      if (isLoggedin) {
        Cookies.set("firstName", isLoggedin.data.firstName);

        login(isLoggedin.data.role, isLoggedin.data.token);

        switch (isLoggedin.data.role) {
          case "admin": //admin
            toast.success("Login Success as an Admin");
            navigate("/admin");
            break;
          case "instruct": //instructor
            toast.success("Login Success as a Instructor");
            navigate("/instructor");
            break;
          case "user": //Learner
            toast.success("Login Success as a Learner");
            navigate("/learner");
            break;
        }
        //window.location.reload();
      }
    } catch (error) {
      if (error.message) {
        toast.error(error.message);
      }
      toast.error(error.response.data.message);
    } finally {
      setBtnDisabled(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      className="shadow-lg bg-white pt-1 pb-5"
    >
      <CssBaseline />
      <Box
        sx={{
          padding: "20px 10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Logo />
        <Typography variant="h5" margin={"10px 0px"}>
          Online Learning Platform
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={buttonDisable}
          >
            Login
          </Button>

          <Link
            component="button"
            variant="body2"
            onClick={() => {
              navigate("/SignUp");
            }}
          >
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
