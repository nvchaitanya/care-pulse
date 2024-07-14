import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../redux/login-flow/CategoriesRedux';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import "./ScheduleAppointment.scss"


function ScheduleAppointment() {
  const dispatch = useDispatch();
  const { categoriesList } = useSelector(state => state.categoriesState)
  const { userList } = useSelector(state => state.loginState)
  const [physicianList, setPhysicianList] = useState([])
  const [scheduleForm, setScheduleForm] = useState({
    specialization: "",
    physician: ""
  })

  const getPhysicianList = (department) => {
    const doctorsList = userList.filter(user => user.role === "physician" && user.specialization === department);
    setPhysicianList(doctorsList)
  }
  useEffect(() => {
    dispatch(getCategories());
    getPhysicianList();
  }, [])

  useEffect(() => {
    getPhysicianList(scheduleForm.specialization);
  }, [scheduleForm.specialization])
  const handleChange = (e) => {
    setScheduleForm({
      ...scheduleForm,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='appointment-wrapper'>
      <form>
        <FormControl className='input-field'>
          <InputLabel id="specialization-label">Specialization</InputLabel>
          <Select
            labelId="specialization-label"
            name="specialization"
            value={scheduleForm.specialization}
            label="Gender"
            onChange={handleChange}
          >
            {categoriesList?.map((ele) => {
              return (
                <MenuItem key={ele.id} value={ele.department}>{ele.department}</MenuItem>
              )
            })}
          </Select>
        </FormControl>

        <FormControl className='input-field'>
          <InputLabel id="gender-label">Physician List</InputLabel>
          <Select
            labelId="gender-label"
            name="physician"
            value={scheduleForm.physician}
            label="Physician"
            onChange={handleChange}
          >
            {physicianList?.map((ele) => {
              return (
                <MenuItem key={ele.id} value={ele.id}>{ele.name}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </form>
    </div>
  )
}

export default React.memo(ScheduleAppointment)