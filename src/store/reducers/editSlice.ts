import { createSlice } from '@reduxjs/toolkit';

export interface editInterface {
    isLoading: boolean;
    error: boolean;
    success: boolean;
}

const initialState: editInterface = {
    isLoading: false,
    success: false,
    error: false,
}

export const editSlice = createSlice({
    name: "editSlice",
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
})

export const { setIsLoading, setSuccess, setError } = editSlice.actions;

export default editSlice.reducer;