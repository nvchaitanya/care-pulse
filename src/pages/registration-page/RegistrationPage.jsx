import { useEffect, useState } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { RegistrationWrapper } from './RegistrationPage.styles';
import { addUser, loginAction } from '../../redux/login-flow/LoginRedux';
import { useSelector, useDispatch } from 'react-redux';
import "./RegistrationPage.scss";
import { InputWrapper } from '../../utils/Form.styles';
import { getCategories } from '../../redux/login-flow/CategoriesRedux';
import SnackbarComponent from '../../utils/SnackbarComponent';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const RegistrationPage = ({ setIsRegistered }) => {
    const dispatch = useDispatch()
    const [showSnackBar, setShowSnackBar] = useState(false);
    const categories = useSelector(state => state.categoriesState)
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
        specialization: "",
        isRegistered: false,
        specilization: null,
        otherSpecilization: null,
        experience: null,
        isDone: false,
        lookupData: [],
        isOthersSelected: false,
        isChecked: false,
        usersData: [],
    });
    const [isPhysician, setIsPhysician] = useState(false);
    const { firstname, lastname, gender, email, password, reenterPassword, dob, mobile, role, specialization } = user
    const [isSubmitClicked, setIsSubmitClicked] = useState(false)

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        if (e.target.name === "role" && e.target.value === "physician") {
            setIsPhysician(true);
        }
    };

    useEffect(() => {
        if (isPhysician) {
            dispatch(getCategories())
        }
    }, [isPhysician])

    const isValid = () => {
        console.log(password, reenterPassword)
        if ((!!firstname && !!lastname && !!gender && !!email && !!password && !!dob && !!mobile) && (password === reenterPassword)) {
            return true
        } else {
            return false
        }
    }

    const reqBody = {
        firstname,
        lastname,
        name: `${firstname} ${lastname}`,
        displayName: firstname,
        gender: gender,
        email,
        password,
        dob,
        mobile,
        role,
        specialization
    }

    const createUserId = (email) => {
      
        reqBody["userId"] = email.split("@")[0]
    }
    const registerUser = (e) => {
        e.preventDefault();
        setIsSubmitClicked(true)
        if (isValid()) {
            createUserId(reqBody.email)
            dispatch(addUser(reqBody))
            setIsRegistered(true)
            setShowSnackBar(true)
        }
    }

    return (
        <RegistrationWrapper onSubmit={registerUser}>
            {/* <button onClick={()=>{dispatch(loginAction.deleteUser())}}>Delete User</button> */}
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
            {isPhysician &&
                <FormControl fullWidth>
                    <InputLabel id="gender-label">Specialization</InputLabel>
                    <Select
                        labelId="gender-label"
                        error={isSubmitClicked && !user.role}
                        name="specialization"
                        helperText={isSubmitClicked && !user.role ? "Select role" : ""}
                        value={user.specialization}
                        label="Role"
                        placeholder='Select your Specialization'
                        onChange={handleChange}
                    >
                        {categories?.categoriesList?.map((ele) => (
                            <MenuItem key={ele?.id} value={ele?.department}>{ele.department}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            }
            <TextField type="email" name="email" fullWidth helperText={isSubmitClicked && !user.email ? "Enter email address" : ""} error={isSubmitClicked && !user.email} value={user.email} placeholder="Enter Email" label="Email" onChange={handleChange} />
            <TextField type="date" name="dob" value={user.dob} error={isSubmitClicked && !user.dob} placeholder="En0ter Date of Birth" label="" onChange={handleChange} className='full-width' />
            <TextField type="mobile" name="mobile" fullWidth error={isSubmitClicked && !user.mobile} value={user.mobile} placeholder="Enter Mobile Number" label="Mobile" onChange={handleChange} />
            <TextField type="password" name="password" fullWidth helperText={isSubmitClicked && !user.password ? "Enter password" : ""} error={isSubmitClicked && !user.password} value={user.password} placeholder="Enter password" label="password" onChange={handleChange} />
            <TextField type="text" name="reenterPassword" fullWidth error={isSubmitClicked && !user.reenterPassword} value={user.reenterPassword} placeholder="Reenter Password" label="Reenter Password" onChange={handleChange} />
            <Button endIcon={<HowToRegIcon />} type="submit" sx={{ width: "50%", alignSelf: "center", textTransform: "none" }} variant='outlined'>Signup</Button>
            <SnackbarComponent showSnackBar={showSnackBar} setShowSnackBar={setShowSnackBar} snackMessage="User added successfully" />
        </RegistrationWrapper>
    )
};

export default RegistrationPage;