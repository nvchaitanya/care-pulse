import React, { useState } from 'react';
import {
    Container, Grid, Paper, Typography, Box, TextField, Select, MenuItem, InputLabel, FormControl, Button
} from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const initialData = {
    firstname: 'John',
    lastname: 'Doe',
    dob: '1990-01-01',
    gender: 'Male',
    ethnicity: 'Caucasian',
    education: "Bachelor's Degree",
    occupation: 'Software Engineer',
    address: '123 Main St, Springfield, IL',
    contact: '555-1234',
    medical_history: 'Hypertension, Asthma',
    family_medical_history: 'Father: Hypertension, Mother: Diabetes',
    surgeries: 'Appendectomy',
    insurance_provider: 'Blue Cross Blue Shield'
};

const PatientProfile = () => {

    const { loggedInUser } = useSelector(state => state.loginState)
    console.log("This the user data", loggedInUser)
    const [patientData, setPatientData] = useState(loggedInUser);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatientData({ ...patientData, [name]: value });
    };

    const handleDateChange = (date) => {
        setPatientData({ ...patientData, dob: dayjs(date).format('YYYY-MM-DD') });
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.firstname = patientData.firstname ? "" : "This field is required.";
        tempErrors.lastname = patientData.lastname ? "" : "This field is required.";
        tempErrors.dob = patientData.dob ? "" : "This field is required.";
        tempErrors.gender = patientData.gender ? "" : "This field is required.";
        tempErrors.contact = patientData.contact ? "" : "This field is required.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Handle form submission
            console.log('Form submitted:', patientData);
        }
    };

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Patient Profile
                </Typography>
                <Paper elevation={3}>
                    <Box p={3}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Personal Information</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="firstname"
                                        label="First Name"
                                        fullWidth
                                        value={patientData.firstname}
                                        onChange={handleInputChange}
                                        error={!!errors.firstname}
                                        helperText={errors.firstname}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="lastname"
                                        label="Last Name"
                                        fullWidth
                                        value={patientData.lastname}
                                        onChange={handleInputChange}
                                        error={!!errors.lastname}
                                        helperText={errors.lastname}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            label="Date of Birth"
                                            inputFormat="YYYY-MM-DD"
                                            value={dayjs(patientData.dob)}
                                            onChange={handleDateChange}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    error={!!errors.dob}
                                                    helperText={errors.dob}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth error={!!errors.gender}>
                                        <InputLabel>Gender</InputLabel>
                                        <Select
                                            name="gender"
                                            value={patientData.gender}
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value="male">Male</MenuItem>
                                            <MenuItem value="female">Female</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="ethnicity"
                                        label="Ethnicity"
                                        fullWidth
                                        value={patientData.ethnicity}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="education"
                                        label="Education"
                                        fullWidth
                                        value={patientData.education}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="occupation"
                                        label="Occupation"
                                        fullWidth
                                        value={patientData.occupation}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="address"
                                        label="Address"
                                        fullWidth
                                        value={patientData.address}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="contact"
                                        label="Contact"
                                        fullWidth
                                        value={patientData.mobile}
                                        onChange={handleInputChange}
                                        error={!!errors.mobile}
                                        helperText={errors.mobile}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Medical Information</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="medical_history"
                                        label="Medical History"
                                        fullWidth
                                        value={patientData.medical_history}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="family_medical_history"
                                        label="Family Medical History"
                                        fullWidth
                                        value={patientData.family_medical_history}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="surgeries"
                                        label="Surgeries"
                                        fullWidth
                                        value={patientData.surgeries}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="insurance_provider"
                                        label="Insurance Provider"
                                        fullWidth
                                        value={patientData.insurance_provider}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box mt={2}>
                                        <Button variant="contained" color="primary" type="submit">
                                            Save
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default PatientProfile;
