import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../redux/login-flow/CategoriesRedux';
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@mui/material';
import "./ScheduleAppointment.scss";
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import axios from 'axios';
import dayjs from 'dayjs';
import SnackbarComponent from '../../utils/SnackbarComponent';
import { HelperText } from '../../common/common.styles';
import { useLocation } from 'react-router-dom';



function ScheduleAppointment() {
  const location = useLocation();

  const dispatch = useDispatch();
  const { categoriesList } = useSelector(state => state.categoriesState)
  const { userList, loggedInUser } = useSelector(state => state.loginState)
  const [physicianList, setPhysicianList] = useState([])
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const [appointmentForm, setAppointmentForm] = useState({
    specialization: "",
    physicianName: "",
    appointmentType: "online",
    appointmentDate: "",
    appointmentTime: ""
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
    getPhysicianList(appointmentForm.specialization);
  }, [appointmentForm.specialization])

  const handleChange = (e) => {
    setAppointmentForm({
      ...appointmentForm,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    console.log("This is the Appointment type ", appointmentForm)
  }, [appointmentDate, appointmentTime])

  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    let isError = false;
    setIsSubmitClicked(true)
    if (!!specialization && !!physicianName && !!appointmentType && !!appointmentDate && !!appointmentTime) {
      const reqBody = {
        patientName: loggedInUser && loggedInUser?.name,
        appointmentType: appointmentType,
        physician: physicianName,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        attendingPhysician: physicianName,
        isConsultationDone: "N",
        referringPhysician: "NA"
      }
      axios.post("http://localhost:8080/appointments", { ...reqBody })
        .then((res) => {
          setIsSubmitSuccess(true)
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
      <div className='appointment-wrapper'>
        <Typography variant="h4" align='center' mb={3}>Book an appointment</Typography>
        <form onSubmit={handleSubmit}>
          <div className='fields-wrapper'>
            <FormControl className='input-field'>
              <InputLabel id="specialization-label">Specialization</InputLabel>
              <Select
                labelId="specialization-label"
                name="specialization"
                value={specialization}
                label="Gender"
                error={isSubmitClicked && !specialization}
                helperText={(isSubmitClicked && !specialization) ? "Please select Specilization" : ""}
                onChange={handleChange}
              >
                {categoriesList?.map((ele) => {
                  return (
                    <MenuItem key={ele.id} value={ele.department}>{ele.department}</MenuItem>
                  )
                })}
              </Select>
              {(isSubmitClicked && !specialization) && <HelperText>Please select specialization</HelperText>}

            </FormControl>

            <FormControl className='input-field'>
              <InputLabel id="gender-label">Select a Physician</InputLabel>
              <Select
                labelId="gender-label"
                name="physicianName"
                value={physicianName}
                label="Physician"
                error={isSubmitClicked && !physicianName}
                onChange={handleChange}
              >
                {physicianList?.map((ele) => {
                  return (
                    <MenuItem key={ele.id} value={ele.name}>{ele.name}</MenuItem>
                  )
                })}
              </Select>
              {(isSubmitClicked && !physicianName) && <HelperText>Please select Physician</HelperText>}
            </FormControl>

            <FormControl className='input-field'>
              <DatePicker
                className={` ${(isSubmitClicked && !appointmentDate) ? "has-error" : ""}`}
                label="Appointment Date"
                format='DD/MM/YYYY'
                views={["month", "day"]}
                minDate={dayjs(new Date())}
                isRequired
                onChange={(dateValue) => {
                  const formattedDate = dayjs(dateValue).format("DD/MM/YYYY")
                  console.log("Different Date Forms", Date(formattedDate), dayjs(new Date().getTime()))
                  console.log("formatted date", formattedDate)
                  setAppointmentForm({ ...appointmentForm, appointmentDate: formattedDate })
                }}
              />
              {(isSubmitClicked && !appointmentDate) && <HelperText>Please select Appointment date</HelperText>}
            </FormControl>

            <FormControl className='input-field'>
              <TimePicker
                className={` ${(isSubmitClicked && !appointmentTime) ? "has-error" : ""}`}
                label="Appointment Time"
                isRequired
                minTime={dayjs()}
                onChange={(timeValue) => {
                  console.log(dayjs().hour())
                  const formattedTime = dayjs(timeValue).format("HH:mm")
                  setAppointmentForm({ ...appointmentForm, appointmentTime: formattedTime })
                }}
              />
              {(isSubmitClicked && !appointmentTime) && <HelperText>Please select Appointment time</HelperText>}
            </FormControl>

            <FormControl className='input-field'>
              <FormLabel id="demo-row-radio-buttons-group-label">Appointment type</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="appointmentType"
                value={appointmentType}
                onChange={handleChange}
              >
                <FormControlLabel value="online" control={<Radio />} label="Online" />
                <FormControlLabel value="offline" control={<Radio />} label="Offline" />
              </RadioGroup>
            </FormControl>
          </div>
          <Button type='submit' endIcon={<MedicalInformationIcon />} variant='outlined' className="submit-btn">Book an appointment</Button>
        </form>
      </div>
      <SnackbarComponent showSnackBar={isError} setShowSnackBar={() => setIsError(false)} snackMessage="Please fill all the fields" status="error" />
      <SnackbarComponent showSnackBar={isSubmitSuccess} setShowSnackBar={() => setIsSubmitSuccess(false)} snackMessage="Appointment Schedule request sent Successfully" status="success" />
    </LocalizationProvider>
  )
}

export default React.memo(ScheduleAppointment)