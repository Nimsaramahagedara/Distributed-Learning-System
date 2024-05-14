import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../utils/Constants';
import authAxios from '../../utils/authAxios';
import Loader from '../../components/Loader/Loader';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Courses = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [Courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div>
      <div className='text-xl font-semibold my-5'>
        <h1 className='my-5'>Your Courses</h1>
        {!isLoading ?
          <div className='w-full overflow-x-scroll'>
            <div className='flex items-center justify-start gap-5 w-max py-10'>
              {Courses.length > 0 ? (
                Courses.slice(0, 10).map((course) => (
                  <Card sx={{ maxWidth: 320 }} onClick={() => navigate(`./learnerlist/${course?._id}`)}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="50"
                        image={course?.image ? course.image : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {course?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {course?.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          Price : {course?.fee}
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
          : <Loader />
        }
      </div>
    </div>
  )
}

export default Courses