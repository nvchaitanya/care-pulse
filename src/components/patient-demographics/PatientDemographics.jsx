// import { useState } from 'react';
// import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
// import { FormWrapper } from '../../common/common.styles.js';
// import "./Demographics.scss";

// const PatientDemographics = () => {
//     const [demographics, setDemographics] = useState({
//         firstname: '',
//         lastname: '',
//         dob: '',
//         gender: '',
//         ethnicity: '',
//         education: '',
//         occupation: '',
//         address: '',
//         contact: '',
//         medical_history: '',
//         family_medical_history: '',
//         surgeries: '',
//         insurance_provider: ''
//     })

//     const handleChange = (e) => {
//         setDemographics({
//             ...demographics,
//             [e.target.name]: e.target.value
//         })
//     }

//     return (
//         <FormWrapper justifyContent="flex-start" px="10px 20px">
//             <TextField className="input-field" type="text" name="firstname" value={demographics.firstname} placeholder="Enter First Name" label="First Name" onChange={handleChange} />
//             <TextField className="input-field" type="text" name="lastname" value={demographics.lastname} placeholder="Enter Last Name" label="Last Name" onChange={handleChange} />
//             <TextField className="input-field" type="text" name="dob" value={demographics.dob} placeholder="Enter Date of Birth" label="Date of Birth" onChange={handleChange} />
//             <FormControl className="input-field">
//                 <InputLabel id="gender-label">Gender</InputLabel>
//                 <Select
//                     labelId="gender-label"
//                     name="gender"
//                     value={demographics.gender}
//                     label="Gender"
//                     onChange={handleChange}
//                 >
//                     <MenuItem value="male">Male</MenuItem>
//                     <MenuItem value="female">Female</MenuItem>
//                     <MenuItem value="transgender">Transgender</MenuItem>
//                 </Select>
//             </FormControl>
//             <TextField className="input-field" type="text" name="ethnicity" value={demographics.ethnicity} placeholder="Enter Ethnicity" label="Ethnicity" onChange={handleChange} />
//             <TextField className="input-field" type="text" name="education" value={demographics.education} placeholder="Enter Education" label="Education" onChange={handleChange} />
//             <TextField className="input-field" type="text" name="occupation" value={demographics.occupation} placeholder="Enter Occupation" label="Occupation" onChange={handleChange} />
//             <TextField className="input-field" type="text" name="address" value={demographics.address} placeholder="Enter Address" label="Address" onChange={handleChange} />
//             <TextField className="input-field" type="text" name="contact" value={demographics.contact} placeholder="Enter Mobile Number" label="Contact" onChange={handleChange} />
//             <TextField className="input-field" type="text" name="medical_history" value={demographics.medical_history} placeholder="Enter Medical History" label="Medical History" onChange={handleChange} />
//             <TextField className="input-field" type="text" name="family_medical_history" value={demographics.family_medical_history} placeholder="Enter amily Medical History" label="Family Medical History" onChange={handleChange} />
//             <TextField className="input-field" type="text" name="surgeries" value={demographics.surgeries} placeholder="Enter Surgeries" label="Surgeries" onChange={handleChange} />
//             <TextField className="input-field" type="text" name="insurance_provider" value={demographics.insurance_provider} placeholder="Enter Insurance Provider" label="Insurance Provider" onChange={handleChange} />
//             <Button type="submit" variant='outlined'>Save</Button>
//         </FormWrapper>
//     )
// };

// export default PatientDemographics;

import React, { useState } from 'react';
import {
    Container, Grid, Paper, Typography, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { styled } from '@mui/system';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const PatientDemographics = () => {
    const [formData, setFormData] = useState({
        firstname: "John",
        lastname: "Doe",
        dob: dayjs("1990-01-01"),
        gender: "Male",
        ethnicity: "Caucasian",
        education: "Bachelor's Degree",
        occupation: "Software Engineer",
        address: "123 Main St, Springfield, IL",
        contact: "555-1234",
        marital_status: "Single",
        number_of_children: 0,
        emergency_contact: {
            name: "Jane Doe",
            relationship: "Sister",
            phone: "555-5678"
        },
        primary_language: "English",
        secondary_language: "Spanish",
        preferred_communication_method: "Email",
        email: "john.doe@example.com"
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        tempErrors.firstname = formData.firstname ? "" : "First name is required";
        tempErrors.lastname = formData.lastname ? "" : "Last name is required";
        tempErrors.dob = formData.dob ? "" : "Date of birth is required";
        tempErrors.gender = formData.gender ? "" : "Gender is required";
        tempErrors.ethnicity = formData.ethnicity ? "" : "Ethnicity is required";
        tempErrors.education = formData.education ? "" : "Education is required";
        tempErrors.occupation = formData.occupation ? "" : "Occupation is required";
        tempErrors.address = formData.address ? "" : "Address is required";
        tempErrors.contact = formData.contact ? "" : "Contact is required";
        tempErrors.marital_status = formData.marital_status ? "" : "Marital status is required";
        tempErrors.number_of_children = formData.number_of_children !== "" ? "" : "Number of children is required";
        tempErrors.emergency_contact = {
            name: formData.emergency_contact.name ? "" : "Emergency contact name is required",
            relationship: formData.emergency_contact.relationship ? "" : "Relationship is required",
            phone: formData.emergency_contact.phone ? "" : "Emergency contact phone is required"
        };
        tempErrors.primary_language = formData.primary_language ? "" : "Primary language is required";
        tempErrors.secondary_language = formData.secondary_language ? "" : "Secondary language is required";
        tempErrors.preferred_communication_method = formData.preferred_communication_method ? "" : "Preferred communication method is required";
        tempErrors.email = formData.email ? "" : "Email is required";

        setErrors(tempErrors);

        return Object.values(tempErrors).every(x => x === "") &&
            Object.values(tempErrors.emergency_contact).every(x => x === "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log(formData);
            // Handle form submission
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEmergencyContactChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            emergency_contact: {
                ...formData.emergency_contact,
                [name]: value
            }
        });
    };

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Patient Demographics
                </Typography>
                <StyledPaper elevation={3}>
                    <form onSubmit={handleSubmit}>
                        <Box mb={2}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Personal Information
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="First Name"
                                        fullWidth
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleInputChange}
                                        error={!!errors.firstname}
                                        helperText={errors.firstname}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Last Name"
                                        fullWidth
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleInputChange}
                                        error={!!errors.lastname}
                                        helperText={errors.lastname}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Date of Birth"
                                            value={formData.dob}
                                            onChange={(newValue) => setFormData({ ...formData, dob: newValue })}
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
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            label="Gender"
                                        >
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </Select>
                                        {errors.gender && <Typography color="error">{errors.gender}</Typography>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Ethnicity"
                                        fullWidth
                                        name="ethnicity"
                                        value={formData.ethnicity}
                                        onChange={handleInputChange}
                                        error={!!errors.ethnicity}
                                        helperText={errors.ethnicity}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Education"
                                        fullWidth
                                        name="education"
                                        value={formData.education}
                                        onChange={handleInputChange}
                                        error={!!errors.education}
                                        helperText={errors.education}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Occupation"
                                        fullWidth
                                        name="occupation"
                                        value={formData.occupation}
                                        onChange={handleInputChange}
                                        error={!!errors.occupation}
                                        helperText={errors.occupation}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Address"
                                        fullWidth
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        error={!!errors.address}
                                        helperText={errors.address}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Contact"
                                        fullWidth
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleInputChange}
                                        error={!!errors.contact}
                                        helperText={errors.contact}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth error={!!errors.marital_status}>
                                        <InputLabel>Marital Status</InputLabel>
                                        <Select
                                            name="marital_status"
                                            value={formData.marital_status}
                                            onChange={handleInputChange}
                                            label="Marital Status"
                                        >
                                            <MenuItem value="Single">Single</MenuItem>
                                            <MenuItem value="Married">Married</MenuItem>
                                            <MenuItem value="Divorced">Divorced</MenuItem>
                                            <MenuItem value="Widowed">Widowed</MenuItem>
                                        </Select>
                                        {errors.marital_status && <Typography color="error">{errors.marital_status}</Typography>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Number of Children"
                                        fullWidth
                                        type="number"
                                        name="number_of_children"
                                        value={formData.number_of_children}
                                        onChange={handleInputChange}
                                        error={!!errors.number_of_children}
                                        helperText={errors.number_of_children}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box mb={2}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Emergency Contact
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Name"
                                        fullWidth
                                        name="name"
                                        value={formData.emergency_contact.name}
                                        onChange={handleEmergencyContactChange}
                                        error={!!errors.emergency_contact?.name}
                                        helperText={
                                            errors.emergency_contact?.name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Relationship"
                                        fullWidth
                                        name="relationship"
                                        value={formData.emergency_contact.relationship}
                                        onChange={handleEmergencyContactChange}
                                        error={!!errors.emergency_contact?.relationship}
                                        helperText={errors.emergency_contact?.relationship}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Phone"
                                        fullWidth
                                        name="phone"
                                        value={formData.emergency_contact.phone}
                                        onChange={handleEmergencyContactChange}
                                        error={!!errors.emergency_contact?.phone}
                                        helperText={errors.emergency_contact?.phone}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box mb={2}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Communication Preferences
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Primary Language"
                                        fullWidth
                                        name="primary_language"
                                        value={formData.primary_language}
                                        onChange={handleInputChange}
                                        error={!!errors.primary_language}
                                        helperText={errors.primary_language}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Secondary Language"
                                        fullWidth
                                        name="secondary_language"
                                        value={formData.secondary_language}
                                        onChange={handleInputChange}
                                        error={!!errors.secondary_language}
                                        helperText={errors.secondary_language}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth error={!!errors.preferred_communication_method}>
                                        <InputLabel>Preferred Communication Method</InputLabel>
                                        <Select
                                            name="preferred_communication_method"
                                            value={formData.preferred_communication_method}
                                            onChange={handleInputChange}
                                            label="Preferred Communication Method"
                                        >
                                            <MenuItem value="Email">Email</MenuItem>
                                            <MenuItem value="Phone">Phone</MenuItem>
                                            <MenuItem value="SMS">SMS</MenuItem>
                                        </Select>
                                        {errors.preferred_communication_method && <Typography color="error">{errors.preferred_communication_method}</Typography>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Email"
                                        fullWidth
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box textAlign="center">
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Box>
                    </form>
                </StyledPaper>
            </Box>
        </Container>
    );
};

export default PatientDemographics