import axios from "axios";
import React, { useEffect, useState } from "react";
import authAxios from '../../../utils/authAxios';
import { Box, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { apiUrl } from "../../../utils/Constants";

const CourseModal = ({ modalType, modalTopic, user, onClose, fetchData }) => {
    const [usersList, setUsersList] = useState([]);
    const [selectedInstructorId, setSelectedInstructorId] = useState('');

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await authAxios.get(`${apiUrl}/user/all`);
          setUsersList(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      fetchUsers();
    }, []);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const payload = {
        id: data.get("id"),
        name: data.get("name"),
        description: data.get("description"),
        fee: data.get("fee"),
        instructorId: data.get("instructorId"),
      };
      try {
        if (modalType === "create") {
          await authAxios.post(`${apiUrl}/course/`, payload);
        } else if (modalType === "edit") {
          await authAxios.put(`${apiUrl}/course/${user._id}`, payload);
        }

        fetchData();
      } catch (error) {
        console.log(error);
      } finally {
        onClose();
      }
    };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{modalTopic}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                name="id"
                required
                fullWidth
                id="id"
                label="Code"
                autoFocus
                defaultValue={user.id}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                defaultValue={user.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                defaultValue={user.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="fee"
                label="Fee"
                type="number"
                id="fee"
                defaultValue={user.fee}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                required
                fullWidth
                name="instructorId"
                // label="Instructor"
                value={selectedInstructorId}
                onChange={(e) => setSelectedInstructorId(e.target.value)}
                SelectProps={{ native: true }}
              >
                <option value="">Select an instructor</option>
                {usersList.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <div className="flex justify-end mt-10">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default CourseModal;
