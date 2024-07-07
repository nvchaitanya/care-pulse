import LoginRedux from "./login-flow/LoginRedux"
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    loginState: LoginRedux
})