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
    section?: string
}


function useAdminHook() {

    /** Create category */
    const addCategories = async (params: addI) => {
        const { type, newLabel, subject, section } = params;
        let data: any = {
            type: type,
            label: newLabel,
        };
        if (type === 'topic') {
            data.subject = subject;
        }
        if (type === 'exam') {
            data.section = section
        }
        console.log(data, '***D')
        try {
            let res = await axios.post('/api/admin/categories', data);
            toast.success('Added successfully');
            return res;
        } catch (error: any) {
            console.log(error, '***');
            toast.warning(error.response.data?.message);
        }

    }

    /** read category */
    const fetchCategories = async (type: string, category?: string) => {
        let params = category ? `type=${type}&category=${category}` : `type=${type}`;
        const res = await fetch(`/api/categories?${params}`)
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