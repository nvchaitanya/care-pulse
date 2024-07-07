import { createSlice } from "@reduxjs/toolkit";

const loginState = createSlice({
    name:"LoginState",
    initialState:{
        isLogged:false,
        userList:[]
    },
    reducers:{
        login:(state) => {
            state.isLogged = true;
        },
        logout:(state)=>{
            state.isLogged = false;
        },
        register:(state, action) => {
            state.userList = [...state.userList, action.payload]
        }
    }
})

export const loginAction = loginState.actions //exporting actions returned by createSlice method
export default loginState.reducer //default exporting reducers returned by createSlice method