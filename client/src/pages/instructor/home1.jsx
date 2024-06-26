import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import MainCarousel from '../../components/Carousel/MainCarousel';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllCourses = async () => {
    try {
      const resp = await authAxios.get(`${apiUrl}/course/instructor/${user._id}`);
      setCourses(resp.data);
      setLoading(false);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching courses.');
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await authAxios.get(`${apiUrl}/user/loggedInUser`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message || 'An error occurred while fetching user details.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserDetails();
      } catch (error) {
        console.error(error);
        setError(error.message || 'An error occurred while fetching user details.');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      getAllCourses();
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
            onClick={(e)=>{navigate("/instruct/addcourses");}}
          >
            Add Course
          </Button>
        </div>
      </div>

      <div className='text-xl font-semibold my-5'>
        <h1 className='my-5'>Your Courses</h1>

        <div className='w-full overflow-x-scroll'>
          <div className='flex items-center justify-start gap-5 w-max py-10'>
            {courses.length > 0 ? (
              courses.slice(0, 10).map((c) => (
                <Card sx={{ maxWidth: 320 }} onClick={() => navigate(`./content/${c?._id}`)}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="50"
                        image={c?.image ? c.image : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {c?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {c?.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          Price : {c?.fee}
                        </Button>
                      </CardActions>
                    </CardActionArea>
                  </Card>
              ))
            ) : (
              <p>No courses available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
