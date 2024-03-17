import { createSlice } from '@reduxjs/toolkit';


export interface loginState {
    isLoading: boolean;
    success: boolean;
    error: boolean;
    data: string
}

const initialState: loginState = {
    isLoading: false,
    success: false,
    error: false,
    data: ''
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoadingLogin: (state, action) => {
            state.isLoading = action.payload;
        },
        setSuccessLogin: (state, action) => {
            state.success = action.payload;
        },
        setErrorLogin: (state, action) => {
            state.error = action.payload;
        },
        setDataLogin: (state, action) => {
            state.data = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setLoadingLogin, setErrorLogin, setSuccessLogin, setDataLogin } = loginSlice.actions

export default loginSlice.reducer