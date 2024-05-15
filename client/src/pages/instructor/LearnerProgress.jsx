import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiUrl } from '../../utils/Constants';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip } from '@mui/material';

export default function LearnerProgress() {
  const { lernerId, courseId } = useParams();

  const [learners, setLearners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLearners = async () => {
      try {
        if (courseId) {
          const response = await fetch(`${apiUrl}/learn/progress/${lernerId}/${courseId}`);
          // const response = await fetch(`${apiUrl}/learn/progress/6640bdc635919aee91bdf784/66405f50c4ebb621ab3e2542`);
          const learnersData = await response.json();
          setLearners(learnersData.contents);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchLearners();
  }, [courseId]);

  return (
    <div> <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>Content Title</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {learners.map((row) => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
              <TableCell align="right"><Chip color="success" label={row.status ? 'Completed' : 'Not Completed'} size="small" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}
