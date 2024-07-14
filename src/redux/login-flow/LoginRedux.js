import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loginState = createSlice({
    name: "LoginState",
    initialState: {
        isLogged: false,
        userList: [],
        addUserErr: ""
    },
    reducers: {
        login: (state) => {
            state.isLogged = true;
        },
        logout: (state) => {
            state.isLogged = false;
        },
        register: (state, action) => {
            state.userList = [...state.userList, action.payload]
        },
        addUserRequest: (state) => {
            state.isLogged = true
        },
        addUserSuccess: (state, action) => {
            state.isLogged = false;
            state.userList = [...state.userList, action.payload];
            state.addUserErr = ""
        },
        addUserFailure: (state, action) => {
            state.isLogged = false;
            state.addUserErr = action.payload
        },
        // deleteUser: (state) => { state.userList.pop(); }
    }
})

export const addUser = (reqBody) => async (dispatch) => {
    dispatch(loginState.actions.addUserRequest());
    try {
        const response = await axios.post("http://localhost:8080/users", { ...reqBody })
        dispatch(loginState.actions.addUserSuccess(response.data));
    }
    catch (err) {
        dispatch(loginState.actions.addUserFailure(err));
    }
}

export const loginAction = loginState.actions //exporting actions returned by createSlice method
export default loginState.reducer //default exporting reducers returned by createSlice method