import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FormWrapper } from '../common/common.styles.js';

const EditMedicationReport = ({ isOpen, handleClose, record }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height: 430,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };


    const handleChange = () => {

    };

    const handleSave = () => {

    };

    return (
        <Modal
            open={isOpen}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2" align="center">
                    Edit Medication Report
                </Typography>
                <FormWrapper justifyContent="center" px="10px 10px">
                    <TextField className="input-field" type="text" name="medicationName" value={record?.medicationName} label="Medication Name" onChange={handleChange} />
                    <TextField className="input-field" type="text" name="dose" value={record?.dose} label="Dose" onChange={handleChange} />
                    <TextField className="input-field" type="text" name="route" value={record?.route} label="Route" onChange={handleChange} />
                    <TextField className="input-field" type="text" name="frequency" value={record?.frequency} label="Frequency" onChange={handleChange} />
                    <TextField className="input-field" type="text" name="unitOfMeasure" value={record?.unitOfMeasure} label="Unit Of Measure" onChange={handleChange} />
                    <TextField className="input-field" type="text" name="startDate" value={record?.startDate} label="Start Date" onChange={handleChange} />
                    <TextField className="input-field" type="text" name="endDate" value={record?.endDate} label="End Date" onChange={handleChange} />
                    <TextField className="input-field" type="text" name="addMedication" value={record?.addMedication} label="Add Medication" onChange={handleChange} />
                </FormWrapper>
                <Stack flexDirection="row" justifyContent="space-between" px="15px" mt="20px">
                    <Button variant="outlined" onClick={handleSave}>Save</Button>
                    <Button variant="text" onClick={handleClose}>Close</Button>
                </Stack>
            </Box>
        </Modal>
    )
};
export default EditMedicationReport;