import { Button, Tab, Tabs, TextField } from "@mui/material";
import { LoginForm, LoginWrapper } from "./LoginPage.styles";
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
        console.log("Lets find the data",enteredUser, userList)
        if (!error) {
            dispatch(loginAction.login())
            dispatch(loginAction.getLoggedInUser({ name: enteredUser.displayName }))
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
            <p className="login-head">Log into Patient portal</p>
            {isRegistered ?
                <div >
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
                        <Button endIcon={<LoginIcon />} onClick={handleLogin}>Proceed to login</Button>
                    </LoginForm>
                    <hr style={{ width: "100%", border: "1px solid rgba(0,0,0,0.1)" }} />
                    <span>I am New here</span>
                    <Button onClick={handleIsRegister}>Create Account</Button>
                </div>
                :
                <RegistrationPage setIsRegistered={setIsRegistered} />
            }
        </LoginWrapper>
    )
}
export default LoginPage