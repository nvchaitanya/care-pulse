import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const categories = createSlice({
    name: "Categories",
    initialState: {
        selectedCategory: {},
        categoriesList: []
    },
    reducers: {
        selectSpecialization: (state, action) => {
            state.selectedCategory = action.payload
        },
        getCategoriesRequest: (state, action) => {
            state.isLoading = true
        },
        getCategoriesSuccess: (state, action) => {
            state.isLoading = false
            state.categoriesList = action.payload
        },
        getCategoriesFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

const { getCategoriesRequest, getCategoriesSuccess, getCategoriesFailure } = categories.actions
export const getCategories = () => async (dispatch) => {
    dispatch(getCategoriesRequest());
    try {
        const response = await axios.get("http://localhost:8080/specializations");
        dispatch(getCategoriesSuccess(response.data))
    }
    catch (err) {
        console.log("this is the error to get the categories",err)
        dispatch(getCategoriesFailure(err))
    }

}

export const categoryAction = categories.actions;
export default categories.reducer