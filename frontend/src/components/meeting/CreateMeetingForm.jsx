import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';

const CreateMeetingForm = ({ onMeetingCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    meetingDate: '',
    startTime: '',
    endTime: '',
    role: '',
    departmentId: '',
    year: ''
  });
  
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Fetch departments when component mounts
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('CreateMeetingForm: Fetching departments from API');
        const response = await axios.get('http://localhost:8080/api/departments', {
          headers: { 'x-access-token': token }
        });
        
        if (response.data && Array.isArray(response.data)) {
          console.log('CreateMeetingForm: Departments received:', response.data);
          setDepartments(response.data);
        } else {
          console.error('CreateMeetingForm: Invalid departments data format:', response.data);
          throw new Error('Invalid departments data received from API');
        }
      } catch (error) {
        console.error('CreateMeetingForm: Error fetching departments:', error);
        setError('Failed to load departments. Please refresh and try again.');
      }
    };
    
    fetchDepartments();
  }, []);
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Validate required fields
      if (!formData.title || !formData.meetingDate || !formData.startTime || 
          !formData.endTime || !formData.role || !formData.departmentId) {
        setError('Please fill all required fields');
        setLoading(false);
        return;
      }
      
      // Validate year field if role is student
      if (formData.role === '1' && !formData.year) {
        setError('Please select a year for student meeting');
        setLoading(false);
        return;
      }
      
      // Prepare meeting data
      const meetingData = {
        title: formData.title,
        description: formData.description,
        meetingDate: formData.meetingDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        role: formData.role, // Send as string, backend will convert
        departmentId: formData.departmentId,
        year: formData.role === '1' ? formData.year : null // Only include year for student meetings
      };
      
      // Send API request
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api/meetings', meetingData, {
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json'
        }
      });
      
      // Handle success
      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        meetingDate: '',
        startTime: '',
        endTime: '',
        role: '',
        departmentId: '',
        year: ''
      });
      
      // Notify parent component
      if (onMeetingCreated && response.data && response.data.meeting) {
        onMeetingCreated(response.data.meeting);
      }
      
    } catch (error) {
      console.error('Error creating meeting:', error);
      setError(error.response?.data?.message || 'Failed to create meeting');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create New Meeting
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Meeting Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Meeting Date"
              name="meetingDate"
              type="date"
              value={formData.meetingDate}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Start Time"
              name="startTime"
              type="time"
              value={formData.startTime}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="End Time"
              name="endTime"
              type="time"
              value={formData.endTime}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Role"
              >
                <MenuItem value="1">Student</MenuItem>
                <MenuItem value="2">Staff</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Department</InputLabel>
              <Select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                label="Department"
              >
                {departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          {formData.role === '1' && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Year</InputLabel>
                <Select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  label="Year"
                >
                  <MenuItem value="1">First Year</MenuItem>
                  <MenuItem value="2">Second Year</MenuItem>
                  <MenuItem value="3">Third Year</MenuItem>
                  <MenuItem value="4">Fourth Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Meeting'}
            </Button>
          </Grid>
        </Grid>
      </Box>
      
      <Snackbar
        open={!!error || success}
        autoHideDuration={6000}
        onClose={() => {
          setError('');
          setSuccess(false);
        }}
      >
        <Alert
          severity={error ? 'error' : 'success'}
          variant="filled"
          onClose={() => {
            setError('');
            setSuccess(false);
          }}
        >
          {error || 'Meeting created successfully!'}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CreateMeetingForm; 