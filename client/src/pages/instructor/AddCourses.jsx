import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from '../../components/Loader/Loader';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buttonDisable, setBtnDisabled] = useState(false);
  const navigate = useNavigate();

  const getUserDetails = async () => {
    try {
      const response = await authAxios.get(`${apiUrl}/user/loggedInUser`);
      if (response && response.data) {
        setUser(response.data);
      } else {
        throw new Error("No data received from the server");
      }
    } catch (error) {
      console.error(error);
      setError(error.message || 'An error occurred while fetching user details.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserDetails();
        setLoading(false)
      } catch (error) {
        console.error(error);
        setError(error.message || 'An error occurred while fetching user details.');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBtnDisabled(true);
    const data = new FormData(event.currentTarget);
    const payload = {
        id: data.get("CourseId"),
        name: data.get("name"),
        description: data.get("description"),
        fee: data.get("fee"),
        instructorId: user ? user._id : null // Ensure user is not null
      };
      try {
        const isCourseAdd = await axios.post(`${apiUrl}/course`, payload);
        if(isCourseAdd){
            toast.success("Course Successfully Added");
            navigate("/instructor");
        }
      } catch (error) {
        if (error.message) {
          toast.error(error.message);
        }
        toast.error(error.response ? error.response.data.message : "An error occurred while adding the course");
      } finally {
        setBtnDisabled(false);
      }
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
        <Typography variant="h5" margin={"10px 0px"}>
          Add Course
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="CourseId"
            label="Course ID"
            name="CourseId"
            autoComplete="CourseId"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Course Name"
            type="text"
            id="name"
            autoComplete="CourseName"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            type="text"
            id="description"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="fee"
            label="Course fee"
            name="fee"
            type="Number"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={buttonDisable}
          >
            Add Course
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
