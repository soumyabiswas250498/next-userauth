import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface registerState {
  isLoading: boolean;
  success: boolean;
  error: boolean;
  data: string
}

const initialState: registerState = {
    isLoading: false,
    success: false,
    error: false, 
    data: ''
}

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setLoadingRegister: (state, action) =>{
        state.isLoading = action.payload;
    },
    setSuccessRegister: (state, action) =>{
        state.success = action.payload;
    },
    setErrorRegister: (state, action) =>{
        state.error = action.payload;
    },
    setDataRegister: (state, action) =>{
      state.data = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLoadingRegister, setErrorRegister, setSuccessRegister, setDataRegister } = registerSlice.actions

export default registerSlice.reducer