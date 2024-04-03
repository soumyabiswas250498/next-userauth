import { createSlice } from '@reduxjs/toolkit';

export interface initialCategoryState {
    isLoading: boolean;
    error: boolean;
    dataSubject: any;
    dataTopic: any;
    dataSection: any;
    dataExam: any
}

const initialState: initialCategoryState = {
    isLoading: true,
    dataSubject: [],
    dataTopic: [],
    dataSection: [],
    dataExam: [],
    error: false,
}

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        setLoadinCategory: (state, action) => {
            state.isLoading = action.payload
        },
        setDataSubject: (state, action) => {
            state.dataSubject = action.payload
        },
        setDataTopic: (state, action) => {
            state.dataTopic = action.payload
        },
        setDataSection: (state, action) => {
            state.dataSection = action.payload
        },
        setDataExam: (state, action) => {
            state.dataExam = action.payload
        },
        setErrorCategory: (state, action) => {
            state.error = action.payload
        }
    },
})

export const { setLoadinCategory, setDataSubject, setErrorCategory, setDataTopic, setDataSection, setDataExam } = categorySlice.actions;
export default categorySlice.reducer;