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

const PatientImmunization = () => {
    const [formData, setFormData] = useState({
        immunizationName: "",
        immunizationDate: dayjs(),
        provider: "",
        batchNumber: "",
        nextDueDate: null,
        notes: ""
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        tempErrors.immunizationName = formData.immunizationName ? "" : "Immunization name is required";
        tempErrors.immunizationDate = formData.immunizationDate ? "" : "Immunization date is required";
        tempErrors.provider = formData.provider ? "" : "Provider is required";
        tempErrors.batchNumber = formData.batchNumber ? "" : "Batch number is required";
        tempErrors.nextDueDate = formData.nextDueDate ? "" : "Next due date is required";
        setErrors(tempErrors);

        return Object.values(tempErrors).every(x => x === "");
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

    const handleDateChange = (name, newValue) => {
        setFormData({
            ...formData,
            [name]: newValue
        });
    };

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Patient Immunization
                </Typography>
                <StyledPaper elevation={3}>
                    <form onSubmit={handleSubmit}>
                        <Box mb={2}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Immunization Details
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Immunization Name"
                                        fullWidth
                                        name="immunizationName"
                                        value={formData.immunizationName}
                                        onChange={handleInputChange}
                                        error={!!errors.immunizationName}
                                        helperText={errors.immunizationName}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Immunization Date"
                                            value={formData.immunizationDate}
                                            onChange={(newValue) => handleDateChange('immunizationDate', newValue)}
                                            sx={{width:"100%"}}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    error={!!errors.immunizationDate}
                                                    helperText={errors.immunizationDate}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Provider"
                                        fullWidth
                                        name="provider"
                                        value={formData.provider}
                                        onChange={handleInputChange}
                                        error={!!errors.provider}
                                        helperText={errors.provider}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Batch Number"
                                        fullWidth
                                        name="batchNumber"
                                        value={formData.batchNumber}
                                        onChange={handleInputChange}
                                        error={!!errors.batchNumber}
                                        helperText={errors.batchNumber}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Next Due Date"
                                            value={formData.nextDueDate}
                                            sx={{width:"100%"}}
                                            onChange={(newValue) => handleDateChange('nextDueDate', newValue)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    error={!!errors.nextDueDate}
                                                    helperText={errors.nextDueDate}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Notes"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
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

export default PatientImmunization;
