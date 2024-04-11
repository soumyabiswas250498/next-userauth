import { useDispatch } from 'react-redux';
import axios from "axios";
import { setIsLoading, setSuccess, setError } from '../store/reducers/editSlice';
import { toast } from 'sonner';

export interface editI {
    id: string,
    type: string,
    newLabel: string
}

function useAdminHook() {
    const dispatch = useDispatch();

    const editCategoriesData = async (params: any) => {
        try {
            dispatch(setIsLoading(true));
            const res = await axios.put('/api/admin/categories', params);
            dispatch(setIsLoading(false));
            dispatch(setSuccess(true));
            toast.success('Edit successful')
            console.log(res, '***r');
        } catch (error) {
            dispatch(setIsLoading(false));
            dispatch(setError(false));
            toast.warning('Edit not successful');
            console.log(error, '***e');
        }
    }

    const fetchCategories = async (type: string, subject?: string) => {
        const res = await fetch(`/api/categories?type=${type}&subject=${subject}`)
        const data = await res.json();
        return data;
    }
    const editCategories = async (params: editI) => {
        try {
            const res = await axios.put('/api/admin/categories', params);
            toast.success('Edit successful');
            return res;
        } catch (error) {
            console.log(error);
            toast.warning('Edit not successful');
        }

    }

    return { editCategoriesData, fetchCategories, editCategories };
}

export default useAdminHook