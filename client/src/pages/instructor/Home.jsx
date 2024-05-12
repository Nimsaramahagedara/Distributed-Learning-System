import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
  FormControlLabel,
  FormGroup,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';

// Additional imports
import { RadioGroup, FormLabel } from '@mui/material';
import Loader from '../../components/Loader/Loader';

const InstructorHome = () => {

  const publishedBy = "admin";
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newNotice, setNewNotice] = useState({
    instructorId: 'gg',
    name: '',
    id: '',
    description: '',
    fee: '',
    publishedBy: publishedBy,
  });


  const [updateFormData, setUpdateFormData] = useState({
    _id: '',
    name: '',
    id: '',
    description: '',
    fee: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleUpdateNotice = (row) => {
    setOpen2(true);
    setUpdateFormData({
      _id: row._id,
      name: row.name,
      description: row.description,
      fee: row.fee,
    });
  };

  const refreshPage = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/`);
        const data = await response.json();
        setNotices(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleCreateNotice = (field, value) => {
    setNewNotice((prevData) => ({ ...prevData, [field]: value }));
  };

  // Use this function to handle changes in checkboxes
  const handleCheckboxChange = (field, value) => {
    setNewNotice((prevData) => ({ ...prevData, [field]: value }));
  };

  const publishNotice = async () => {
    try {
      const result = await fetch(`${apiUrl}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNotice),
      });
      const data = await result.json();

      if (result.ok) {
        console.log('Notice Published successfully:', data);
        toast.success(data.message);
        refreshPage();
        handleClose();
      } else {
        console.error('Error creating teacher:', data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error creating teacher:', error);
      toast.error('An error occurred while creating the teacher.');
    }
  };

  const handleDeleteNotice = async (id) => {
    try {
      const result = await authAxios.delete(`${apiUrl}/${id}`);

      if (result) {
        handleClose2();
        toast.warning('Notice Deleted Successfully');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      refreshPage();
    }
  };

  const handleUpdate = async () => {
    try {
      const result = await authAxios.put(`${apiUrl}/${updateFormData._id}`, updateFormData);

      if (result) {
        toast.success('Notice Updated Successfully');
        handleClose2();
        refreshPage();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Course
      </Button>
      <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Publish a Notice</DialogTitle>
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
                  id="notice-title"
                  label="Course Id"
                  fullWidth
                  onChange={(e) => handleCreateNotice('id', e.target.value)}
                  value={newNotice.id}
                />
              </div>
              <div>
                <TextField
                  id="notice-title"
                  label="Name"
                  fullWidth
                  onChange={(e) => handleCreateNotice('name', e.target.value)}
                  value={newNotice.name}
                />
              </div>
              <div>
                <TextField
                  id="notice-discription"
                  label="Discription"
                  multiline
                  rows={4}
                  fullWidth
                  onChange={(e) => handleCreateNotice('description', e.target.value)}
                  value={newNotice.description}
                />
              </div>
              <div>
                <TextField
                  id="notice-title"
                  label="Fee"
                  fullWidth
                  type='number'
                  onChange={(e) => handleCreateNotice('fee', e.target.value)}
                  value={newNotice.fee}
                />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={publishNotice} variant='outlined'>Publish</Button>
            <Button onClick={handleClose} variant='outlined'>Cancel</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      {!isLoading ?
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Discription</TableCell>
                <TableCell>Fee</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notices.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.fee}</TableCell>
                  <TableCell>
                    <Button variant="outlined" startIcon={<VisibilityIcon />} color="secondary"
                      onClick={() => handleUpdateNotice(row)}
                      sx={{ marginRight: 2 }}
                    > View </Button>

                    <Dialog open={open2} onClose={handleClose2} sx={{ border: '2px solid #ccc' }}>
                      <DialogTitle sx={{ textAlign: 'center' }}>Edit Notice</DialogTitle>
                      <DialogContent>
                        <div>
                          <TextField
                            required
                            id="outlined-read-only-input"
                            label="ID"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => setUpdateFormData({ ...updateFormData, id: e.target.value })}
                            value={updateFormData.id}
                          />

                          <TextField
                            required
                            id="outlined-read-only-input"
                            label="Title"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => setUpdateFormData({ ...updateFormData, name: e.target.value })}
                            value={updateFormData.name}
                          />

                          <TextField
                            required
                            id="outlined-required"
                            label="Price"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => setUpdateFormData({ ...updateFormData, description: e.target.value })}
                            value={updateFormData.description}
                            multiline
                            rows={4}
                          />

                          <TextField
                            required
                            id="outlined-read-only-input"
                            label="Fee"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => setUpdateFormData({ ...updateFormData, fee: e.target.value })}
                            value={updateFormData.fee}
                          />
                        </div>
                        <DialogActions style={{ justifyContent: 'center' }}>
                          <Button size="small" startIcon={<SaveIcon />} onClick={handleUpdate} variant="contained" color="primary">
                            Update
                          </Button>

                          <Button size="small" startIcon={<DeleteIcon />} variant="contained" color="error" onClick={() => handleDeleteNotice(updateFormData._id)}>
                            Remove
                          </Button>
                          <Button size="small" startIcon={<CancelIcon />} variant='outlined' onClick={handleClose2}>Cancel</Button>
                        </DialogActions>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        : <Loader />
      }
    </div>
  )
}

export default InstructorHome