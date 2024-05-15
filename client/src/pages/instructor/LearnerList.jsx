import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiUrl } from '../../utils/Constants';
import Loader from '../../components/Loader/Loader';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import { Typography } from '@mui/material';

export default function LearnerList() {
  const { courseId } = useParams();
  const temp = '66405f50c4ebb621ab3e2542'
  const navigate = useNavigate();
  const [learners, setLearners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLearners = async () => {
      try {
        if (courseId) {
          const response = await fetch(`${apiUrl}/pay/course/${courseId}`);
          const learnersData = await response.json();

          const learnersWithNames = await Promise.all(
            learnersData.map(async (learner) => {
              const userResponse = await fetch(`${apiUrl}/user/one/${learner.userId}`);
              const userData = await userResponse.json();
              return { ...learner, firstName: userData.firstName, lastName: userData.lastName };
            })
          );

          setLearners(learnersWithNames);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchLearners();
  }, [courseId]);

  if (isLoading) {
    return <Loader />;
  }

  const handleLearnerClick = (learnerId) => {
    navigate(`/instruct/courses/learnerprogress/${learnerId}/${courseId}`);
  };

  return (
    <div>
      <Typography variant='h6' className='text-center'>Learner List</Typography>
      <Box sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
        <List component="nav" aria-label="main mailbox folders">
          {learners.map((learner, index) => (
            <React.Fragment key={index}>
              <ListItemButton onClick={() => handleLearnerClick(learner.userId)}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={`${learner.firstName} ${learner.lastName}`} />
              </ListItemButton>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </div>
  );
}
