import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormWrapper } from '../common/common.styles.js';
import axios from 'axios';
import "./EditAppointment.css";
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


const EditAppointment = ({ isOpen, handleClose, selectedRecord: record }) => {
    const [userData, setUserData] = useState({
        appointmentDate: "",
        appointmentTime: "",
        referringPhysician: ""
    })

    const { appointmentDate, appointmentTime } = userData
    const [minTime, setMinTime] = useState(dayjs().hour(9).minute(0))
    const [isSaveClicked, setIsSaveClicked] = useState(false)

    useEffect(() => {
        console.log("Record date", record, dayjs("15:25", "HH:mm"))
        setUserData({
            appointmentDate: dayjs(record.appointmentDate, "DD/MM/YYYY"),
            appointmentTime: dayjs(record.appointmentTime, "HH:mm"),
            referringPhysician: record.referringPhysician
        })
    }, [record])

    useEffect(() => {
        console.log(dayjs(appointmentDate,"DD/MM/YYYY").isSame(dayjs(), "day"))
        if (dayjs(appointmentDate).isSame(dayjs(), "day")) {
          setMinTime(dayjs())
        } else {
          setMinTime(dayjs(appointmentDate).hour(9).minute(0))
        }
      }, [appointmentDate])

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
        setIsSaveClicked(true)
        let data = {
            appointmentDate: appointmentDate,
            appointmentTime: appointmentTime,
            referringPhysician: referringPhysician,
        }
        axios.patch(`http://localhost:8080/appointments/${id}`, data)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Modal
                open={isOpen}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" align="center">
                        Edit Appointment
                    </Typography>
                    <FormWrapper justifyContent="center" px="10px 10px">
                        <TextField className="input-field" type="text" name="patientName" value={record.patientName} label="Patient Name" disabled />
                        <DatePicker
                            label="Appointment Date"
                            className='input-field'
                            format='DD/MM/YYYY'
                            views={["month", "day"]}
                            value={userData.appointmentDate}
                            slotProps={{
                                textField: {
                                    helperText: (isSaveClicked && !appointmentDate) ? "Please select Appointment date" : "",
                                    error: (isSaveClicked && !appointmentDate)
                                },
                            }}
                            minDate={dayjs(new Date())}
                            isRequired
                            onChange={(dateValue) => {
                                const formattedDate = dayjs(dateValue)
                                setUserData({ ...userData, appointmentDate: formattedDate })
                            }}
                        />

                        <TimePicker
                            className='input-field'
                            label="Appointment Time"
                            format='HH:mm'
                            ampm={false}
                            minTime={minTime}
                            maxTime={dayjs().hour(18).minute(0)}
                            value={userData.appointmentTime}
                            slotProps={{
                                textField: {
                                    helperText: (isSaveClicked && !appointmentTime) ? "Please select Appointment date" : "",
                                    error: (isSaveClicked && !appointmentTime)
                                },
                            }}
                            minDate={dayjs(new Date())}
                            isRequired
                            onChange={(dateValue) => {
                                const formattedDate = dayjs(dateValue)
                                setUserData({ ...userData, appointmentTime: formattedDate })
                            }}
                        />
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
        </LocalizationProvider>
    )
};
export default EditAppointment;