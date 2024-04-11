import React, { useEffect, useState } from 'react';
import useAdminHook from '@/src/hooks/useAdminHook';
import CategoryBody from './Body';
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { editI } from '@/src/hooks/useAdminHook';

function SectionsSection() {
    const [dataFinal, setDataFinal] = useState([{ id: '1', label: '' }]);
    const { fetchCategories, editCategories, addCategories, deleteCategory } = useAdminHook();
    const [success, setSuccess] = useState(false);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['SectionsSection', 'section'],
        queryFn: ({ queryKey }) => fetchCategories(queryKey[1])
    });
    useEffect(() => {
        if (data) {
            const obj = data.map((item: any) => { return { id: item._id, label: item.section } }); setDataFinal(obj);
        }
    }, [data]);

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (data: any) => { return data.isEdit ? editCategories(data) : addCategories(data) },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['SectionsSection', 'section'],
            })
        }
    });

    const deleteFunc = async (id: string, type: string) => {
        const res: any = await deleteCategory(id, type);
        if (res?.data?.success) {
            queryClient.invalidateQueries({
                queryKey: ['SectionsSection', 'section'],
            })
            setSuccess(true);
        }
    }

    if (isLoading) {
        return (
            <div className='flex flex-col gap-2'>
                <Skeleton className="h-8 w-[250px]" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
            </div>
        )
    } else {
        return (
            <CategoryBody data={dataFinal} type={'section'} mutation={mutation} deleteFunc={deleteFunc} success={success} setSuccess={setSuccess} />
        )
    }
}

export default SectionsSection