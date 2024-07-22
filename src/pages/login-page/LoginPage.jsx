import { Button, Tab, Tabs, TextField } from "@mui/material";
import { LoginForm, LoginImageWrapper, LoginWrapper } from "./LoginPage.styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/login-flow/LoginRedux";
import LoginIcon from '@mui/icons-material/Login';
import RegistrationPage from "../registration-page/RegistrationPage";
import { useSelector } from "react-redux";
import { InputWrapper } from "../../utils/Form.styles";
import "./LoginPage.scss";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector(state => state.loginState);
    const [form, setForm] = useState({
        userId: "",
        password: ""
    });
    const [role, setRole] = useState("patient");
    const errors = {
        "noUser": "User doesn't exist",
        "mismatch": "Username and password mismatch",
        "invalidrole": "No user exists with that role"
    }
    const errorValidation = () => {
        const { userList } = userState;
        const enteredUser = userList.find(ele => ele.userId === userId)
        if (userList.map(ele => ele.userId).includes(userId) === false) {
            return errors["noUser"];
        }
        else if (enteredUser.password !== password) {
            return errors["mismatch"];
        }
        if (enteredUser.role !== role) {
            return errors["invalidrole"]
        }
    }
    const [isRegistered, setIsRegistered] = useState(true);
    const { userId, password } = form
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const error = errorValidation();
        console.log(error);
        const { userList } = userState;
        const enteredUser = userList.find(ele => ele.userId === userId)
        console.log("Lets find the data", enteredUser, userList)
        if (!error) {
            dispatch(loginAction.login())
            dispatch(loginAction.getLoggedInUser({ name: enteredUser.displayName,...enteredUser }))
            navigate("/", { state: { userId: userId } })
        } else {
            alert(error)
        }

    };

    const handleIsRegister = () => {
        setIsRegistered(false)
    };

    const changeTab = (e, newValue) => {
        setRole(newValue)
    }

    return (
        <LoginWrapper>
            <div className="mask-wrapper">
                <div className="login-actions-wrapper">
                    <p className="login-head">{isRegistered ? "Log into Care pulse" : "Signup to Care pulse"}</p>
                    {isRegistered ?
                        <div className="d-flex flex-column align-items-center">
                            <Tabs value={role} onChange={changeTab} className="border-red">
                                <Tab value="patient" label="Patient" />
                                <Tab value="physician" label="Physician" />
                                <Tab value="admin" label="Administrator" />
                            </Tabs>
                            <LoginForm className="full-width" onSubmit={handleLogin}>
                                <InputWrapper className="full-width">
                                    <span className="input-label">Username</span>
                                    <TextField className="input-field" value={userId} type="text" name="userId" placeholder="Enter your User ID" label="userId" onChange={handleChange} />
                                </InputWrapper>
                                <InputWrapper className="full-width">
                                    <span className="input-label">Password</span>
                                    <TextField className="input-field" value={password} type="password" name="password" placeholder="Enter your password" label="password" onChange={handleChange} />
                                </InputWrapper>
                                <Button sx={{ textTransform: "none", background: "rgb(0,75,140)", marginTop: "20px" }} fullWidth variant="contained" endIcon={<LoginIcon />} onClick={handleLogin}>Proceed to login</Button>
                                <div className="register-action">
                                    <span>Not registered yet</span>
                                    <Button sx={{ fontSize: "12px", textTransform: "none" }} onClick={handleIsRegister}>Create Account</Button>
                                </div>
                            </LoginForm>
                            <hr style={{ width: "100%", border: "1px solid rgba(0,0,0,0.1)" }} />
                        </div>
                        :
                        <RegistrationPage setIsRegistered={setIsRegistered} />
                    }
                </div>
            </div>
        </LoginWrapper>
    )
}
export default LoginPage


















// import React from 'react';
// import axios from 'axios';
// import { Link, Redirect } from 'react-router-dom';
// import { AvForm, AvField } from 'availity-reactstrap-validation';
// import logo from '../../Assets/Images/logo.png';
// import './Login.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// class Login extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             password: ''
//         }
//     }
//     handleChange = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//     };

//     handleSubmit = (e,errors,values) => {
//         e.preventDefault()
//         if(errors.length === 0){
//             let data = {
//                 email: this.state.username,
//                 password: this.state.password
//             }
//             axios.post("http://localhost:8000/login",data)
//             .then(res => {
//                 if(res.data){
//                     console.log("login details are",res.data)
//                     let token = res.data.accessToken;
//                     let role = res.data.user.role;
//                     let userDetails = res.data.user;
//                     this.myFormRef && this.myFormRef.reset();
//                     if(token !== "" && token !== undefined && token !== null){
//                         localStorage.setItem("accessToken",token)
//                         localStorage.setItem("userDetails",JSON.stringify(userDetails))
//                         if(role === "Patient"){
//                             this.props.history.push("/patient/dashboard/");
//                         }else if(role === "Physician"){
//                             this.props.history.push("/physician/dashboard")
//                         }else{
//                             this.props.history.push("/admin/dashboard")
//                         }
//                     }
//                 }
//             })
//             .catch(err => {
//                 this.myFormRef && this.myFormRef.reset();
//                 console.log("Error Found is",err)
//             })
//         }
//     };

//     render() {
//         return (
//             <div style={{ backgroundColor: "#f3f2f1" }}>
//                 <div className="py-3 d-flex justify-content-center bg-color">
//                     <img src={logo} alt="Logo" className="img-fluid my-3" />
//                 </div>
//                 <div className="container">
//                     <div className="text-center align-items-center login-box">
//                         <div className="col-12 col-md-8 col-lg-5 pt-0 px-0 offset-lg-4 border rounded" style={{ backgroundColor: "#ffffff" }}>
//                             <div className="col py-2 text-light rounded" style={{ backgroundColor: "#000000" }}>
//                                 <span className="h2">ENTER YOUR LOGIN</span>
//                             </div>
//                             <AvForm className="text-left login-font mt-4 px-3" onSubmit={this.handleSubmit} ref={c => (this.myFormRef = c)}>
//                                 <div className="form-group">
//                                     <label>Username</label>
//                                     <div className="form-group">
//                                         <AvField type="email" name="username" value={this.state.username} placeholder="Email address" onChange={this.handleChange} className="form-control"
//                                             validate={{
//                                             required: { value: true, errorMessage: 'Username is required' },
//                                             pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, errorMessage: 'Username is Invalid' }
//                                         }} />
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label>Password</label>
//                                     <div className="form-group">
//                                         <AvField type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} className="form-control"
//                                             validate={{
//                                             required: { value: true, errorMessage: 'Password is required' }
//                                         }} />
//                                         <span><Link to="/UserVerification">Forgot Password?</Link></span>
//                                     </div>
//                                 </div>
//                                 <div className="text-center my-5">
//                                     <button className="btn btn-primary px-5 rounded-0">LOGIN</button>
//                                 </div>
//                             </AvForm>
//                             <span>Don't have an Account? <Link to="/registration">Sign up</Link></span>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="py-5 d-flex justify-content-center bg-color" style={{ marginTop: "14.3%" }}></div>
//             </div>
//         )
//     }
// }
// export default Login;