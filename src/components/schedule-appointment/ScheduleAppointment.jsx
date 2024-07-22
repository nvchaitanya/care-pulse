// import React, { useEffect, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux';
// import { getCategories } from '../../redux/login-flow/CategoriesRedux';
// import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@mui/material';
// import "./ScheduleAppointment.scss";
// import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
// import axios from 'axios';
// import dayjs from 'dayjs';
// import SnackbarComponent from '../../utils/SnackbarComponent';
// import { HelperText } from '../../common/common.styles';
// import { useLocation } from 'react-router-dom';



// function ScheduleAppointment() {
//   const location = useLocation();

//   const dispatch = useDispatch();
//   const { categoriesList } = useSelector(state => state.categoriesState)
//   const { userList, loggedInUser } = useSelector(state => state.loginState)
//   const [physicianList, setPhysicianList] = useState([])
//   const [minTime, setMinTime] = useState(dayjs().hour(9).minute(0))
//   const [isSubmitClicked, setIsSubmitClicked] = useState(false);
//   const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

//   const [appointmentForm, setAppointmentForm] = useState({
//     specialization: "",
//     physicianName: "",
//     appointmentType: "online",
//     appointmentDate: null,
//     appointmentTime: null
//   })

//   const { specialization, physicianName, appointmentType, appointmentDate, appointmentTime } = appointmentForm

//   const getPhysicianList = (department) => {
//     console.log("Department ===>", department, userList)
//     const doctorsList = userList.filter(user => user.role === "physician" && user.specialization === department);
//     setPhysicianList(doctorsList)
//   }
//   useEffect(() => {
//     dispatch(getCategories());
//     getPhysicianList();
//   }, [])

//   useEffect(() => {
//     console.log(dayjs(appointmentDate).isSame(dayjs(), "day"))
//     if (dayjs(appointmentDate).isSame(dayjs(), "day")) {
//       setMinTime(dayjs())
//     } else {
//       setMinTime(dayjs(appointmentDate).hour(9).minute(0))
//     }
//   }, [appointmentDate])

//   useEffect(() => {
//     getPhysicianList(appointmentForm.specialization);
//   }, [appointmentForm.specialization])

//   const handleChange = (e) => {
//     setAppointmentForm({
//       ...appointmentForm,
//       [e.target.name]: e.target.value
//     })
//   }

//   const [isError, setIsError] = useState(false);

//   const handleReset = () => {
//     setAppointmentForm({
//       specialization: "",
//       physicianName: "",
//       appointmentType: "online",
//       appointmentDate: null,
//       appointmentTime: null
//     })
//     setIsSubmitClicked(false)
//   };

//   useEffect(() => {
//     console.log("LoggedInuser details", loggedInUser)
//   }, [loggedInUser])

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     let isError = false;
//     setIsSubmitClicked(true)
//     if (!!specialization && !!physicianName && !!appointmentType && !!appointmentDate && !!appointmentTime) {
//       const reqBody = {
//         patientName: loggedInUser && loggedInUser?.name,
//         appointmentType: appointmentType,
//         physician: physicianName,
//         appointmentDate: dayjs(appointmentDate).format("DD/MM/YYYY"),
//         appointmentTime: dayjs(appointmentTime).format("HH:mm"),
//         attendingPhysician: physicianName,
//         consultationStatus: "Pending",
//         referringPhysician: "NA"
//       }
//       axios.post("http://localhost:8080/appointments", { ...reqBody })
//         .then((res) => {
//           setIsSubmitSuccess(true);
//           handleReset();
//         })
//         .catch(error => {
//           console.log("Error from the POST API", error)
//         })
//     }
//     else {
//       setIsError(true)
//     }
//   }

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <div className='appointment-wrapper'>
//         <Typography variant="h4" align='center' mb={3}>Book an appointment</Typography>
//         <form onSubmit={handleSubmit}>
//           <div className='fields-wrapper '>
//             <FormControl className='input-field'>
//               <InputLabel id="specialization-label">Specialization</InputLabel>
//               <Select
//                 labelId="specialization-label"
//                 name="specialization"
//                 value={specialization}
//                 label="Gender"
//                 error={isSubmitClicked && !specialization}
//                 helperText={(isSubmitClicked && !specialization) ? "Please select Specilization" : ""}
//                 onChange={handleChange}
//               >
//                 {categoriesList?.map((ele) => {
//                   return (
//                     <MenuItem key={ele.id} value={ele.department}>{ele.department}</MenuItem>
//                   )
//                 })}
//               </Select>
//               {(isSubmitClicked && !specialization) && <HelperText>Please select specialization</HelperText>}

//             </FormControl>

//             <FormControl className='input-field'>
//               <InputLabel id="gender-label">Select a Physician</InputLabel>
//               <Select
//                 labelId="gender-label"
//                 name="physicianName"
//                 value={physicianName}
//                 label="Physician"
//                 error={isSubmitClicked && !physicianName}
//                 onChange={handleChange}
//               >
//                 {physicianList?.map((ele) => {
//                   return (
//                     <MenuItem key={ele.id} value={ele.name}>{ele.name}</MenuItem>
//                   )
//                 })}
//               </Select>
//               {(isSubmitClicked && !physicianName) && <HelperText>Please select Physician</HelperText>}
//             </FormControl>

//             <FormControl className='input-field'>
//               <DatePicker
//                 label="Appointment Date"
//                 format='DD/MM/YYYY'
//                 views={["month", "day"]}
//                 value={appointmentDate}
//                 slotProps={{
//                   textField: {
//                     helperText: (isSubmitClicked && !appointmentDate) ? "Please select Appointment date" : "",
//                     error: (isSubmitClicked && !appointmentDate),
//                     placeholder: appointmentDate ? "Please Select date" : ""
//                   },
//                 }}
//                 minDate={dayjs(new Date())}
//                 isRequired
//                 onChange={(dateValue) => {
//                   const formattedDate = dayjs(dateValue)
//                   setAppointmentForm({ ...appointmentForm, appointmentDate: formattedDate })
//                 }}
//               />
//             </FormControl>

//             <FormControl className='input-field'>
//               <TimePicker
//                 className={` ${(isSubmitClicked && !appointmentTime) ? "has-error" : ""}`}
//                 label="Appointment Time"
//                 isRequired
//                 ampm={false}
//                 minTime={minTime}
//                 maxTime={dayjs(appointmentDate).hour(20).minute(0)}
//                 value={appointmentTime}
//                 onChange={(timeValue) => {
//                   const formattedTime = dayjs(timeValue)
//                   setAppointmentForm({ ...appointmentForm, appointmentTime: formattedTime })
//                 }}
//               />
//               {(isSubmitClicked && !appointmentTime) && <HelperText>Please select Appointment time</HelperText>}
//             </FormControl>

//             <FormControl className='input-field'>
//               <FormLabel id="demo-row-radio-buttons-group-label">Appointment type</FormLabel>
//               <RadioGroup
//                 row
//                 aria-labelledby="demo-row-radio-buttons-group-label"
//                 name="appointmentType"
//                 value={appointmentType}
//                 onChange={handleChange}
//               >
//                 <FormControlLabel value="online" control={<Radio />} label="Online" />
//                 <FormControlLabel value="offline" control={<Radio />} label="Offline" />
//               </RadioGroup>
//             </FormControl>
//           </div>
//           <Button type='submit' endIcon={<MedicalInformationIcon />} variant='outlined' className="submit-btn">Book an appointment</Button>
//         </form>
//       </div>
//       <SnackbarComponent showSnackBar={isError} setShowSnackBar={() => setIsError(false)} snackMessage="Please fill all the fields" status="error" />
//       <SnackbarComponent showSnackBar={isSubmitSuccess} setShowSnackBar={() => setIsSubmitSuccess(false)} snackMessage="Appointment Schedule request sent Successfully" status="success" />
//     </LocalizationProvider>
//   )
// }

// export default React.memo(ScheduleAppointment)


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../redux/login-flow/CategoriesRedux';
import {
  Container, Grid, Paper, Typography, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl,
  RadioGroup, FormControlLabel, Radio, FormLabel
} from '@mui/material';
import { styled } from '@mui/system';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import axios from 'axios';
import dayjs from 'dayjs';
import SnackbarComponent from '../../utils/SnackbarComponent';
import { HelperText } from '../../common/common.styles';
import { useLocation } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

function ScheduleAppointment() {
  const location = useLocation();

  const dispatch = useDispatch();
  const { categoriesList } = useSelector(state => state.categoriesState)
  const { userList, loggedInUser } = useSelector(state => state.loginState)
  const [physicianList, setPhysicianList] = useState([])
  const [minTime, setMinTime] = useState(dayjs().hour(9).minute(0))
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const [appointmentForm, setAppointmentForm] = useState({
    specialization: "",
    physicianName: "",
    appointmentType: "online",
    appointmentDate: null,
    appointmentTime: null
  })

  const { specialization, physicianName, appointmentType, appointmentDate, appointmentTime } = appointmentForm

  const getPhysicianList = (department) => {
    console.log("Department ===>", department, userList)
    const doctorsList = userList.filter(user => user.role === "physician" && user.specialization === department);
    setPhysicianList(doctorsList)
  }
  useEffect(() => {
    dispatch(getCategories());
    getPhysicianList();
  }, [])

  useEffect(() => {
    console.log(dayjs(appointmentDate).isSame(dayjs(), "day"))
    if (dayjs(appointmentDate).isSame(dayjs(), "day")) {
      setMinTime(dayjs())
    } else {
      setMinTime(dayjs(appointmentDate).hour(9).minute(0))
    }
  }, [appointmentDate])

  useEffect(() => {
    getPhysicianList(appointmentForm.specialization);
  }, [appointmentForm.specialization])

  const handleChange = (e) => {
    setAppointmentForm({
      ...appointmentForm,
      [e.target.name]: e.target.value
    })
  }

  const [isError, setIsError] = useState(false);

  const handleReset = () => {
    setAppointmentForm({
      specialization: "",
      physicianName: "",
      appointmentType: "online",
      appointmentDate: null,
      appointmentTime: null
    })
    setIsSubmitClicked(false)
  };

  useEffect(() => {
    console.log("LoggedInuser details", loggedInUser)
  }, [loggedInUser])

  const handleSubmit = (e) => {
    e.preventDefault()
    let isError = false;
    setIsSubmitClicked(true)
    if (!!specialization && !!physicianName && !!appointmentType && !!appointmentDate && !!appointmentTime) {
      const reqBody = {
        patientName: loggedInUser && loggedInUser?.name,
        appointmentType: appointmentType,
        physician: physicianName,
        appointmentDate: dayjs(appointmentDate).format("DD/MM/YYYY"),
        appointmentTime: dayjs(appointmentTime).format("HH:mm"),
        attendingPhysician: physicianName,
        consultationStatus: "Pending",
        referringPhysician: "NA"
      }
      axios.post("http://localhost:8080/appointments", { ...reqBody })
        .then((res) => {
          setIsSubmitSuccess(true);
          handleReset();
        })
        .catch(error => {
          console.log("Error from the POST API", error)
        })
    }
    else {
      setIsError(true)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Book an appointment
          </Typography>
          <StyledPaper elevation={3}>
            <form onSubmit={handleSubmit}>
              <Box mb={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={isSubmitClicked && !specialization}>
                      <InputLabel>Specialization</InputLabel>
                      <Select
                        name="specialization"
                        value={specialization}
                        onChange={handleChange}
                        label="Specialization"
                      >
                        {categoriesList?.map((ele) => (
                          <MenuItem key={ele.id} value={ele.department}>{ele.department}</MenuItem>
                        ))}
                      </Select>
                      {isSubmitClicked && !specialization && <HelperText>Please select specialization</HelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={isSubmitClicked && !physicianName}>
                      <InputLabel>Select a Physician</InputLabel>
                      <Select
                        name="physicianName"
                        value={physicianName}
                        onChange={handleChange}
                        label="Physician"
                      >
                        {physicianList?.map((ele) => (
                          <MenuItem key={ele.id} value={ele.name}>{ele.name}</MenuItem>
                        ))}
                      </Select>
                      {isSubmitClicked && !physicianName && <HelperText>Please select Physician</HelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={isSubmitClicked && !appointmentDate}>
                      <DatePicker
                        label="Appointment Date"
                        value={appointmentDate}
                        onChange={(dateValue) => setAppointmentForm({ ...appointmentForm, appointmentDate: dayjs(dateValue) })}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={isSubmitClicked && !appointmentDate}
                            helperText={isSubmitClicked && !appointmentDate && "Please select Appointment date"}
                          />
                        )}
                        minDate={dayjs(new Date())}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={isSubmitClicked && !appointmentTime}>
                      <TimePicker
                        label="Appointment Time"
                        value={appointmentTime}
                        onChange={(timeValue) => setAppointmentForm({ ...appointmentForm, appointmentTime: dayjs(timeValue) })}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={isSubmitClicked && !appointmentTime}
                            helperText={isSubmitClicked && !appointmentTime && "Please select Appointment time"}
                          />
                        )}
                        minTime={minTime}
                        maxTime={dayjs(appointmentDate).hour(20).minute(0)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Appointment type</FormLabel>
                      <RadioGroup row name="appointmentType" value={appointmentType} onChange={handleChange}>
                        <FormControlLabel value="online" control={<Radio />} label="Online" />
                        <FormControlLabel value="offline" control={<Radio />} label="Offline" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
              <Box textAlign="center">
                <Button type='submit' endIcon={<MedicalInformationIcon />} variant='contained' color="primary">
                  Book an appointment
                </Button>
              </Box>
            </form>
          </StyledPaper>
        </Box>
        <SnackbarComponent showSnackBar={isError} setShowSnackBar={() => setIsError(false)} snackMessage="Please fill all the fields" status="error" />
        <SnackbarComponent showSnackBar={isSubmitSuccess} setShowSnackBar={() => setIsSubmitSuccess(false)} snackMessage="Appointment Schedule request sent Successfully" status="success" />
      </Container>
    </LocalizationProvider>
  )
}

export default React.memo(ScheduleAppointment);
