import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TableHead, TableRow, TextField, TableContainer, Table, TableBody, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { DashboardWrapper } from '../common/common.styles';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import EditAppointment from './EditAppointment';
import DeleteAppointment from './DeleteAppointment';
import EditMedicationReport from './EditMedicationReport';

const PhysicianDashboard = () => {
    const [searchKey, setSearchKey] = useState('');
    const [filteredData, setFilteredData] = useState('');
    const [appointmentData, setAppointmentData] = useState([]);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedRecordId, setSelectedRecordId] = useState('');
    const [selectedRecord, setSelectedRecord] = useState('');
    const [isReportOpen, setIsReportOpen] = useState(false);

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    useEffect(() => {
        axios.get("http://localhost:8080/appointments")
            .then(response => {
                setAppointmentData(response.data);
                setFilteredData(response.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleChange = (e) => {
        setSearchKey(e.target.value)
    };

    useEffect(() => {
        let filteredData = [...appointmentData];
        const result = filteredData.filter((item) => {
            if (searchKey.trim() === '') {
                return item
            } else if (item.patientName.toLowerCase().includes(searchKey.toLowerCase())) {
                return item
            }
        });
        setFilteredData(result);
    }, [searchKey])

    const handleEdit = (record) => {
        setIsEditOpen(true);
        setSelectedRecord(record)
    };

    const handleEditClose = () => {
        setIsEditOpen(false)
    };

    const handleReport = () => {
        setIsReportOpen(true);
    };

    const handleReportClose = () => {
        setIsReportOpen(false);
    };

    const handleDelete = (id) => {
        setIsDeleteOpen(true);
        setSelectedRecordId(id);
    };

    const handleDeleteClose = () => {
        setIsDeleteOpen(false)
    };

    const confirmDelete = (id) => {
        axios.delete(`http://localhost:8080/appointments/${id}`)
            .then(response => {
                console.log(response.data, response.data.length);
                setIsDeleteOpen(false);
                axios.get("http://localhost:8080/appointments")
                    .then(response => {
                        setAppointmentData(response.data);
                        setFilteredData(response.data);
                    })
            })
            .catch(err => {
                console.log(err)
            })
    };

    const items = [
        {
            id: 1,
            label: 'Patient Name',
        },
        {
            id: 2,
            label: 'Appointment Date Time',
        },
        {
            id: 3,
            label: 'Appointment Type',
        },
        {
            id: 4,
            label: 'Attending Physician',
        },
        {
            id: 5,
            label: 'Referring Physician',
        },
        {
            id: 6,
            label: 'Status',
        },
        {
            id: 7,
            label: 'Modify',
        },
        {
            id: 8,
            label: 'Delete',
        },
    ];

    return (
        <DashboardWrapper>
            <h1>View Appointments</h1>
            <TextField
                sx={{ width: '40%', margin: '10px' }}
                size="small"
                name="searchKey"
                value={searchKey}
                placeholder="Search By Patient Name"
                onChange={(e) => handleChange(e)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {items && items.map(item => {
                                return (
                                    <TableCell
                                        key={item.id}
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {item.label}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData && filteredData.map(element => {
                            return (
                                <StyledTableRow key={element.id}>
                                    <TableCell>{element.patientName}</TableCell>
                                    <TableCell>{element.appointmentDate + " " + element.appointmentTime}</TableCell>
                                    <TableCell>{element.appointmentType}</TableCell>
                                    <TableCell>{element.attendingPhysician}</TableCell>
                                    <TableCell>{element.referringPhyscian}</TableCell>
                                    <TableCell>
                                        <span style={{ padding: '10px', backgroundColor: element.consultationStatus === 'Pending' ? 'orange' : 'rgb(15,168,15)' }}>{element.consultationStatus}</span>
                                    </TableCell>
                                    <TableCell>
                                        {element.consultationStatus === "Pending" 
                                            ?
                                            <Button variant="outlined" sx={{ textTransform: "none" }} onClick={() => handleEdit(element)}>Modify Appointment</Button>
                                            : 
                                            <Button variant="outlined" sx={{ textTransform: "none" }} onClick={handleReport}>Modify Report</Button>
                                        }
                                    </TableCell>
                                    <TableCell><Button variant="outlined" color="error" sx={{ textTransform: "none" }} onClick={() => handleDelete(element.id)}>Delete</Button></TableCell>
                                </StyledTableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <EditAppointment
                isOpen={isEditOpen}
                handleClose={handleEditClose}
                selectedRecord={selectedRecord}
            />
            <DeleteAppointment
                isOpen={isDeleteOpen}
                handleClose={handleDeleteClose}
                id={selectedRecordId}
                confirmDelete={confirmDelete}
            />
            <EditMedicationReport
                isOpen={isReportOpen}
                handleClose={handleReportClose}
            />
        </DashboardWrapper>
    )
};

export default PhysicianDashboard