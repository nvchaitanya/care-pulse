import { useState } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { RegistrationWrapper } from './RegistrationPage.styles';
import { loginAction } from '../../redux/login-flow/LoginRedux';
import { useSelector, useDispatch } from 'react-redux';
import "./RegistrationPage.scss";
import { InputWrapper } from '../../utils/Form.styles';

const RegistrationPage = ({ setIsRegistered }) => {
    const dispatch = useDispatch()
    const reduxState = useSelector(state => state)
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        gender: '',
        email: '',
        password: '',
        reenterPassword: '',
        dob: '',
        mobile: '',
        role: "",
        isRegistered: false,
        specilization: null,
        otherSpecilization: null,
        experience: null,
        isDone: false,
        lookupData: [],
        isOthersSelected: false,
        isChecked: false,
        usersData: []
    });
    const { firstname, lastname, gender, email, password, reenterPassword, dob, mobile, role } = user
    const [isSubmitClicked, setIsSubmitClicked] = useState(false)

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };

    const isValid = () => {
        console.log(password, reenterPassword)
        if ((!!firstname && !!lastname && !!gender && !!email && !!password && !!dob && !!mobile) && (password === reenterPassword)) {
            return true
        } else {
            return false
        }
    }

    const reqBody = {
        name: `${firstname} ${lastname}`,
        gender: gender,
        email,
        password,
        dob,
        mobile,
        role
    }
    const createUserId = (email) => {
        reqBody["userId"] = email.split("@")[0]
    }
    const registerUser = (e) => {
        e.preventDefault();
        setIsSubmitClicked(true)
        if (isValid()) {
            createUserId(reqBody.email)
            dispatch(loginAction.register(reqBody))
            setIsRegistered(true)
        }

    }

    return (
        <RegistrationWrapper onSubmit={registerUser}>
            <InputWrapper>
                <TextField fullWidth error={isSubmitClicked && !user.firstname} helperText={isSubmitClicked && !user.firstname ? "Enter First name" : ""} type="text" name="firstname" value={user.firstname} placeholder="Enter First Name" label="First Name" onChange={handleChange} />
            </InputWrapper>
            <TextField fullWidth error={isSubmitClicked && !user.lastname} helperText={isSubmitClicked && !user.lastname ? "Enter Last name" : ""} type="text" name="lastname" value={user.lastname} placeholder="Enter Last Name" label="Last Name" onChange={handleChange} />
            <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                    labelId="gender-label"
                    error={isSubmitClicked && !user.gender}
                    name="gender"
                    helperText={isSubmitClicked && !user.gender ? "Select gender" : ""}
                    value={user.gender}
                    label="Gender"
                    onChange={handleChange}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="transgender">Transgender</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="gender-label">Role</InputLabel>
                <Select
                    labelId="gender-label"
                    error={isSubmitClicked && !user.role}
                    name="role"
                    helperText={isSubmitClicked && !user.role ? "Select role" : ""}
                    value={user.role}
                    label="Role"
                    onChange={handleChange}
                >
                    <MenuItem value="patient">Patient</MenuItem>
                    <MenuItem value="physician">Physician</MenuItem>
                </Select>
            </FormControl>
            <TextField type="email" name="email" helperText={isSubmitClicked && !user.email ? "Enter email address" : ""} error={isSubmitClicked && !user.email} value={user.email} placeholder="Enter Email" label="Email" onChange={handleChange} />
            <TextField type="date" name="dob" value={user.dob} error={isSubmitClicked && !user.dob} placeholder="En0ter Date of Birth" label="" onChange={handleChange} className='full-width' />
            <TextField type="mobile" name="mobile" error={isSubmitClicked && !user.mobile} value={user.mobile} placeholder="Enter Mobile Number" label="Mobile" onChange={handleChange} />
            <TextField type="password" name="password" helperText={isSubmitClicked && !user.password ? "Enter password" : ""} error={isSubmitClicked && !user.password} value={user.password} placeholder="Enter password" label="password" onChange={handleChange} />
            <TextField type="text" name="reenterPassword" error={isSubmitClicked && !user.reenterPassword} value={user.reenterPassword} placeholder="Reenter Password" label="Reenter Password" onChange={handleChange} />
            <Button type="submit">Register</Button>
        </RegistrationWrapper>
    )
};

export default RegistrationPage;