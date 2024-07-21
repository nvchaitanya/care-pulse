import React from 'react';
import {
    Container, Grid, Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { styled } from '@mui/system';

const billingData = {
    billing_id: 'BILL123456',
    patient_name: 'John Doe',
    billing_date: '2024-07-21',
    due_date: '2024-08-21',
    total_amount: 1200.00,
    amount_paid: 300.00,
    outstanding_balance: 900.00,
    services: [
        {
            service_date: '2024-07-10',
            description: 'General Consultation',
            amount: 200.00
        },
        {
            service_date: '2024-07-15',
            description: 'Blood Test',
            amount: 100.00
        },
        {
            service_date: '2024-07-18',
            description: 'X-Ray',
            amount: 300.00
        },
        {
            service_date: '2024-07-20',
            description: 'MRI Scan',
            amount: 600.00
        }
    ]
};

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const BillingPage = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Billing Information
                </Typography>
                <StyledPaper elevation={3}>
                    <Box mb={2}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Billing Details
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1"><strong>Billing ID:</strong> {billingData.billing_id}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1"><strong>Patient Name:</strong> {billingData.patient_name}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1"><strong>Billing Date:</strong> {billingData.billing_date}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1"><strong>Due Date:</strong> {billingData.due_date}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1"><strong>Total Amount:</strong> ${billingData.total_amount.toFixed(2)}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1"><strong>Amount Paid:</strong> ${billingData.amount_paid.toFixed(2)}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1"><strong>Outstanding Balance:</strong> ${billingData.outstanding_balance.toFixed(2)}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box mb={2}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Services
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Service Date</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {billingData.services.map((service, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{service.service_date}</TableCell>
                                            <TableCell>{service.description}</TableCell>
                                            <TableCell align="right">${service.amount.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </StyledPaper>
            </Box>
        </Container>
    );
};

export default BillingPage;
