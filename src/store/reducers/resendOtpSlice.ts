import { createSlice } from '@reduxjs/toolkit';


export interface resendOtpI {
    isLoading: boolean;
    success: boolean;
    error: boolean;
    data: string
}

const initialState: resendOtpI = {
    isLoading: false,
    success: false,
    error: false,
    data: ''
}

export const resendOtpSlice = createSlice({
    name: 'resendOtp',
    initialState,
    reducers: {
        setLoadingresendOtp: (state, action) => {
            state.isLoading = action.payload;
        },
        setSuccessresendOtp: (state, action) => {
            state.success = action.payload;
        },
        setErrorresendOtp: (state, action) => {
            state.error = action.payload;
        },
        setDataresendOtp: (state, action) => {
            state.data = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setLoadingresendOtp, setErrorresendOtp, setSuccessresendOtp, setDataresendOtp } = resendOtpSlice.actions

export default resendOtpSlice.reducer