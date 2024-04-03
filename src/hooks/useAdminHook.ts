import { useDispatch } from 'react-redux';
import axios from "axios";
import { setLoadinCategory, setDataSubject, setDataTopic, setDataSection, setDataExam, setErrorCategory } from '../store/reducers/categorySlice';

function useAdminHook() {
    const dispatch = useDispatch();

    const getCategoriesData = async (params: any) => {
        const { type, subject } = params;
        console.log(type, '***')
        try {
            dispatch(setLoadinCategory(true));
            dispatch(setErrorCategory(false));
            const res = type === 'topic' ? await axios.get(`/api/categories?type=${type}&subject=${subject}`) : await axios.get(`/api/categories?type=${type}`);
            console.log(res, '***')
            if (type === 'subject') dispatch(setDataSubject(res.data));
            if (type === 'topic') dispatch(setDataTopic(res.data));
            if (type === 'section') dispatch(setDataSection(res.data));
            if (type === 'exam') dispatch(setDataExam(res.data))
            dispatch(setLoadinCategory(false));
            return res.data;

            // console.log(res, '***')

        } catch (error) {
            dispatch(setLoadinCategory(false));
            dispatch(setErrorCategory(true));
            console.log(error)
        }
    }

    return { getCategoriesData };
}

export default useAdminHook