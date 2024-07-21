import React from 'react';
import { Container, Grid, Paper, Typography, Box, Avatar } from '@mui/material';
import { styled } from '@mui/system';

const patientData = {
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

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
}));

const AvatarBox = styled(Box)(({ theme }) => ({
    marginRight: theme.spacing(2),
}));

const PatientDashboard = () => {
    return (
        <Container className='mt-5'>
            <Header>
                <AvatarBox>
                    <Avatar alt={`${patientData.firstname} ${patientData.lastname}`} sx={{ width: 56, height: 56 }}>
                        {patientData.firstname[0]}{patientData.lastname[0]}
                    </Avatar>
                </AvatarBox>
                <Typography variant="h4" component="h1">
                    Patient Dashboard
                </Typography>
            </Header>
            <StyledPaper elevation={3}>
                <Box mb={2}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Personal Information
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1"><strong>First Name:</strong> {patientData.firstname}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1"><strong>Last Name:</strong> {patientData.lastname}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1"><strong>Date of Birth:</strong> {patientData.dob}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1"><strong>Gender:</strong> {patientData.gender}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1"><strong>Ethnicity:</strong> {patientData.ethnicity}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1"><strong>Education:</strong> {patientData.education}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1"><strong>Occupation:</strong> {patientData.occupation}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1"><strong>Address:</strong> {patientData.address}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1"><strong>Contact:</strong> {patientData.contact}</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box mb={2}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Medical Information
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1"><strong>Medical History:</strong> {patientData.medical_history}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1"><strong>Family Medical History:</strong> {patientData.family_medical_history}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1"><strong>Surgeries:</strong> {patientData.surgeries}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1"><strong>Insurance Provider:</strong> {patientData.insurance_provider}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </StyledPaper>
        </Container>
    );
};

export default PatientDashboard;
