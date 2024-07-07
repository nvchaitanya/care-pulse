import { createSlice } from "@reduxjs/toolkit"

const categories = createSlice({
    name:"Categories",
    initialState:{
        selectedCategory:{}
    },
    reducers:{
        selectSpecialization: (state,action) => {
            state.selectedCategory = action.payload
        }
    }
})

export const categoryAction = categories.actions;
export default categories.reducer