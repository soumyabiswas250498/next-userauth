import { useDispatch } from 'react-redux';
import axios from "axios";
import { setIsLoading, setSuccess, setError } from '../store/reducers/editSlice';
import { toast } from 'sonner';

export interface editI {
    id: string,
    type: string,
    newLabel: string
}
export interface addI {
    type: string,
    newLabel: string,
    subject?: string,
}


function useAdminHook() {
    const fetchCategories = async (type: string, subject?: string) => {
        const res = await fetch(`/api/categories?type=${type}&subject=${subject}`)
        const data = await res.json();
        return data;
    }
    const editCategories = async (params: editI) => {
        try {
            const res = await axios.put('/api/admin/categories', { type: params.type, id: params.id, newLabel: params.newLabel });
            toast.success('Edit successful');
            return res;
        } catch (error: any) {
            console.log(error, '***');
            toast.warning(error.response.data?.message);
        }

    }
    const addCategories = async (params: addI) => {
        try {
            const res = await axios.post('/api/admin/categories', params.type === 'topic' ? { type: params.type, label: params.newLabel, subject: params.subject } : { type: params.type, label: params.newLabel });
            toast.success('Added successfully');
            return res;
        } catch (error: any) {
            console.log(error, '***');
            toast.warning(error.response.data?.message);
        }

    }
    const deleteCategory = async (id: string, type: string) => {
        try {
            const res = await axios.delete(`/api/admin/categories?id=${id}&type=${type}`);
            toast.success('Deleted successfully');
            return res;

        } catch (error) {
            console.log(error)
            toast.warning('Something went wrong!')
        }

    }

    return { fetchCategories, editCategories, addCategories, deleteCategory };
}

export default useAdminHook