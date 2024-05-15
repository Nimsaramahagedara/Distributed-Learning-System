import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../utils/Constants';
import authAxios from '../../utils/authAxios';
import Loader from '../../components/Loader/Loader';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
      <div>
        <h1 className='my-5'>Your Courses</h1>
        {!isLoading ?
          <Box sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>

            {Courses.length > 0 ? (
              Courses.slice(0, 10).map((course) => (

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    {course?.name} - {course?.id}
                  </AccordionSummary>
                  <AccordionDetails>
                    {course?.description}
                  </AccordionDetails>
                  <AccordionActions>
                    <Button onClick={() => navigate(`./learnerlist/${course?._id}`)}>View Learners</Button>
                  </AccordionActions>
                </Accordion>
              ))
            ) : (
              <p>No courses available</p>
            )}
          </Box>
          : <Loader />
        }
      </div>
    </div>
  )
}

export default Courses