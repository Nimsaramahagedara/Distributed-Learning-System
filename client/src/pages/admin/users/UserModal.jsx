import axios from "axios";
import React, { useEffect, useState } from "react";
import authAxios from '../../../utils/authAxios';
import { Box, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { apiUrl } from "../../../utils/Constants";

const UserModal = ({modalType, modalTopic, user, onClose, fetchData }) => {

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get('email'),
      password: data.get('password'),
      contactNo: data.get('contactNo'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      role: data.get('role'),
  };
    try {
      if(modalType === 'create'){
        await authAxios.post(`${apiUrl}/user/register`, payload);
      } else if (modalType === 'edit') {
        await authAxios.post(`${apiUrl}/user/register`, payload);
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
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                defaultValue={user.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                defaultValue={user.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="contactNo"
                label="contact Number"
                type="number"
                id="contactNo"
                defaultValue={user.contactNo}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                defaultValue={user.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  User Type
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="role"
                  defaultValue={user.role}
                >
                  <FormControlLabel
                    value="user"
                    control={<Radio />}
                    label="Student"
                  />
                  <FormControlLabel
                    value="instruct"
                    control={<Radio />}
                    label="instructer"
                  />
                  <FormControlLabel
                    value="admin"
                    control={<Radio />}
                    label="admin"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <div className="flex justify-end">
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

export default UserModal;
