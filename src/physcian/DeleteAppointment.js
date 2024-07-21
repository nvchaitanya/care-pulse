import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';

const DeleteAppointment = ({ isOpen, handleClose, setIsDeleteOpen, id }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const confirmDelete = (id) => {
        axios.delete(`http://localhost:8080/appointments/${id}`)
            .then(response => {
                console.log(response.data, response.data.length);
                setIsDeleteOpen(false);
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Modal
            open={isOpen}
        >
            <Box sx={style}>
                <Typography variant="h6" component="h2" sx={{ marginBottom: '10px' }}>
                    Are you sure you want to Delete this Record?
                </Typography>
                <Stack flexDirection="row" justifyContent="space-between">
                    <Button variant="outlined" onClick={confirmDelete}>Confirm</Button>
                    <Button variant="text" onClick={handleClose}>Close</Button>
                </Stack>
            </Box>
        </Modal>
    )
};
export default DeleteAppointment;