import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import React from 'react';

const DeleteAppointment = ({ isOpen, handleClose, id, confirmDelete }) => {
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

    return (
        <Modal
            open={isOpen}
        >
            <Box sx={style}>
                <Typography variant="h6" component="h2" sx={{ marginBottom: '10px' }}>
                    Are you sure you want to Delete this Record?
                </Typography>
                <Stack flexDirection="row" justifyContent="space-between">
                    <Button variant="outlined" onClick={() => confirmDelete(id)}>Confirm</Button>
                    <Button variant="text" onClick={handleClose}>Close</Button>
                </Stack>
            </Box>
        </Modal>
    )
};
export default DeleteAppointment;