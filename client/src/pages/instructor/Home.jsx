import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box
} from '@mui/material';

import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import Loader from '../../components/Loader/Loader';
import MainCarousel from '../../components/Carousel/MainCarousel';
import CourseCard from '../../components/Course/CourseCard';

const InstructorHome = () => {

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [Courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newCourse, setNewCourse] = useState({
    instructorId: '',
    name: '',
    id: '',
    description: '',
    fee: ''
  });

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await authAxios.get(`${apiUrl}/user/loggedInUser`);
        setUser(response.data._id);
      } catch (error) {
        console.error(error);
      }
    };

    getUserDetails();
  }, []);

  useEffect(() => {
    if (user) {
      setNewCourse(prevCourse => ({
        ...prevCourse,
        instructorId: user
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const response = await fetch(`${apiUrl}/course/instructor/${user}`);
          const data = await response.json();
          setCourses(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user, refresh]);

  const handleCreateCourse = (field, value) => {
    setNewCourse(prevData => ({ ...prevData, [field]: value }));
  };

  const publishCourse = async () => {
    try {
      const result = await fetch(`${apiUrl}/course/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse),
      });

      const data = await result.json();

      if (result.ok) {
        toast.success(data.message);
        setRefresh(prev => !prev); // Refresh data
        handleClose();
      } else {
        console.error('Error creating course:', data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error creating course:', error);
      toast.error('An error occurred while creating the course.');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className='w-full'>
      <div className='flex items-stretch justify-center bg-white p-5 border rounded-xl gap-5'>
        <MainCarousel>
          <div>
            <img src="https://img.freepik.com/free-psd/e-learning-online-courses-banner-template_23-2149109791.jpg" />
          </div>
          <div>
            <img src="https://www.shutterstock.com/image-illustration/business-training-courses-concept-can-260nw-1483009133.jpg" />
          </div>
          <div>
            <img src="https://t3.ftcdn.net/jpg/04/01/36/86/360_F_401368641_nEdHMBlrlmyW09cBtm4lvb83EtN7Gx5t.jpg" />
          </div>
        </MainCarousel>
        <div className='w-full bg-white'>
          <h1 className='text-2xl font-semibold'>Online Learning Portal</h1>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleClickOpen}
          >
            Add Course
          </Button>
          <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Publish a Course</DialogTitle>
              <DialogContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': {
                      m: 1,
                      width: 500,
                      maxWidth: '100%',
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      id="Course-title"
                      label="Course Id"
                      fullWidth
                      onChange={(e) => handleCreateCourse('id', e.target.value)}
                      value={newCourse.id}
                    />
                  </div>
                  <div>
                    <TextField
                      id="Course-title"
                      label="Name"
                      fullWidth
                      onChange={(e) => handleCreateCourse('name', e.target.value)}
                      value={newCourse.name}
                    />
                  </div>
                  <div>
                    <TextField
                      id="Course-discription"
                      label="Discription"
                      multiline
                      rows={4}
                      fullWidth
                      onChange={(e) => handleCreateCourse('description', e.target.value)}
                      value={newCourse.description}
                    />
                  </div>
                  <div>
                    <TextField
                      id="Course-title"
                      label="Fee"
                      fullWidth
                      type='number'
                      onChange={(e) => handleCreateCourse('fee', e.target.value)}
                      value={newCourse.fee}
                    />
                  </div>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={publishCourse} variant='outlined'>Publish</Button>
                <Button onClick={handleClose} variant='outlined'>Cancel</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </div>
      </div>

      <div className='text-xl font-semibold my-5'>
        <h1 className='my-5'>Your Courses</h1>
        {!isLoading ?
          <div className='w-full overflow-x-scroll'>
            <div className='flex items-center justify-start gap-5 w-max py-10'>
              {Courses.length > 0 ? (
                Courses.slice(0, 10).map((c) => (
                  <CourseCard key={c._id} course={c} />
                ))
              ) : (
                <p>No courses available</p>
              )}
            </div>
          </div>
          : <Loader />
        }
      </div>
    </div>
  )
}

export default InstructorHome