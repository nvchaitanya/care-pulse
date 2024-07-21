import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FormWrapper } from '../common/common.styles.js';
import axios from 'axios';
import "./EditAppointment.css"

const EditAppointment = ({ isOpen, handleClose, selectedRecord: record, setSelectedRecord }) => {
    const [userData, setUserData] = useState({
        appointmentDate: record.appointmentDate,
        appointmentTime: record.appointmentTime,
        referringPhysician: record.referringPhysician
    })

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };


    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    };

    const handleSave = () => {
        let id = record.id;
        const { appointmentDate, appointmentTime, referringPhysician } = userData;
        let data = {
            appointmentDate: appointmentDate,
            appointmentTime: appointmentTime,
            referringPhysician: referringPhysician,
        }
        axios.patch(`http://localhost:8080/appointments/${id}`,data)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <Modal
            open={isOpen}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2" align="center">
                    Edit Appointment
                </Typography>
                <FormWrapper justifyContent="center" px="10px 10px">
                    <TextField className="input-field" type="text" name="patientName" value={record.patientName} label="Patient Name" disabled />
                    <TextField className="input-field" type="text" name="appointmentDate" value={userData.appointmentDate} label="Appointment Date" onChange={handleChange} />
                    <TextField className="input-field" type="text" name="appointmentTime" value={userData.appointmentTime} label="Appointment Time" onChange={handleChange} />
                    <FormControl className="input-field">
                        <InputLabel id="referring-physician">Referring Physician</InputLabel>
                        <Select
                            labelId="referring-physician"
                            name="referringPhysician"
                            value={userData.referringPhysician}
                            label="Referring Physician"
                            onChange={handleChange}
                        >
                            <MenuItem value="male">Male</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField className="input-field" type="text" name="appointmentType" label="Appointment Type" value={record.appointmentType} disabled />
                    <TextField className="input-field" type="text" name="consultationStatus" value={record.consultationStatus} label="Consultation Status" disabled />
                </FormWrapper>
                <Stack flexDirection="row" justifyContent="space-between" px="15px" mt="20px">
                    <Button variant="outlined" onClick={handleSave}>Save</Button>
                    <Button variant="text" onClick={handleClose}>Close</Button>
                </Stack>
            </Box>
        </Modal>
    )
};
export default EditAppointment;