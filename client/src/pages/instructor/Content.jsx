import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { apiUrl } from '../../utils/Constants';
import authAxios from '../../utils/authAxios';
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
  InputLabel,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';


export default function Content() {
  const { courseId } = useParams();
  const navigate = useNavigate()
  const [Course, setCourse] = useState({});
  const [contents, setContents] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newContent, setNewContent] = useState({
    courseid: courseId,
    title: '',
    description: '',
    file: ''
  });

  const [updateFormData, setUpdateFormData] = useState({
    _id: '',
    title: '',
    description: '',
    file: ''
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

  const handleUpdateContent = (row) => {
    setOpen2(true);
    setUpdateFormData({
      _id: row._id,
      title: row.title,
      description: row.description,
      file: row.file,
    });
  };

  const refreshPage = () => {
    setRefresh((prev) => !prev);
  };


  useEffect(() => {
    const getCourseData = async () => {
      try {
        const response = await authAxios.get(`${apiUrl}/course/${courseId}`);
        setCourse(response);
        console.log(Course);
      } catch (error) {
        console.error(error);
      }
    };

    const getContents = async () => {
      try {
        const response = await authAxios.get(`${apiUrl}/course/content/course/${courseId}`);
        setContents(response.data);
        console.log(contents);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getCourseData();
    getContents();
  }, []);

  const handleCreateContent = (field, value) => {
    setNewContent((prevData) => ({ ...prevData, [field]: value }));
  };

  const publishContent = async () => {
    try {
      const result = await fetch(`${apiUrl}/course/content/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContent),
      });
      const data = await result.json();

      if (result.ok) {
        console.log('Content Published successfully:', data);
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

  const handleDeleteContent = async (id) => {
    try {
      const result = await authAxios.delete(`${apiUrl}/course/content/${id}`);

      if (result) {
        handleClose2();
        toast.warning('Content Deleted Successfully');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      refreshPage();
    }
  };

  const handleUpdate = async () => {
    try {
      const result = await authAxios.put(`${apiUrl}/course/content/${updateFormData._id}`, updateFormData);

      if (result) {
        toast.success('Content Updated Successfully');
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
        Add Content
      </Button>
      <Button variant="outlined" onClick={()=>navigate(`/instruct/course/${courseId}`)}>
      Manage Course
      </Button>
      {!isLoading ? <>
        <React.Fragment>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Content</DialogTitle>
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
                    id="Content-title"
                    label="Title"
                    fullWidth
                    onChange={(e) => handleCreateContent('title', e.target.value)}
                    value={newContent.title}
                  />
                </div>
                <div>
                  <TextField
                    id="Content-discription"
                    label="Discription"
                    multiline
                    rows={4}
                    fullWidth
                    onChange={(e) => handleCreateContent('description', e.target.value)}
                    value={newContent.description}
                  />

                  <InputLabel htmlFor="outlined-button-file">Attachment</InputLabel>
                  <TextField
                    required
                    id="outlined-button-file"
                    fullWidth
                    type='file'
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => handleCreateContent('file', e.target.value)}
                    value={newContent.file}
                  />
                </div>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={publishContent} variant='outlined'>Publish</Button>
              <Button onClick={handleClose} variant='outlined'>Cancel</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>

        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Discription</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead> <TableBody>
              {contents.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.file}</TableCell>
                  <TableCell>{row.status == true ? 'Approved' : 'Pending'}</TableCell>
                  <TableCell>
                    <Button variant="outlined" startIcon={<VisibilityIcon />} color="secondary"
                      onClick={() => handleUpdateContent(row)}
                      sx={{ marginRight: 2 }}
                    > View </Button>

                    <Dialog open={open2} onClose={handleClose2} sx={{ border: '2px solid #ccc' }}>
                      <DialogTitle sx={{ textAlign: 'center' }}>Edit Content</DialogTitle>
                      <DialogContent>
                        <div>
                          <TextField
                            required
                            id="outlined-read-only-input"
                            label="Title"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => setUpdateFormData({ ...updateFormData, title: e.target.value })}
                            value={updateFormData.title}
                          />

                          <TextField
                            required
                            id="outlined-required"
                            label="Description"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => setUpdateFormData({ ...updateFormData, description: e.target.value })}
                            value={updateFormData.description}
                            multiline
                            rows={4}
                          />
                        </div>
                        <DialogActions style={{ justifyContent: 'center' }}>
                          <Button size="small" startIcon={<SaveIcon />} onClick={handleUpdate} variant="contained" color="primary">
                            Update
                          </Button>

                          <Button size="small" startIcon={<DeleteIcon />} variant="contained" color="error" onClick={() => handleDeleteContent(updateFormData._id)}>
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
        </TableContainer></> : <Loader />
      }
    </div>

  )
}
