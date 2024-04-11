import React, { useEffect, useState } from 'react'
import useAdminHook from '@/src/hooks/useAdminHook'
import CategoryBody from './Body';
import { Skeleton } from "@/components/ui/skeleton"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { editI } from '@/src/hooks/useAdminHook';

function SubjectSection() {
    const [dataFinal, setDataFinal] = useState([{ id: '1', label: '' }])
    const { fetchCategories, editCategories } = useAdminHook();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['SubjectSection', 'subject'],
        queryFn: ({ queryKey }) => fetchCategories(queryKey[1])
    });
    useEffect(() => {
        if (data) {
            const obj = data.map((item: any) => { return { id: item._id, label: item.subject } }); setDataFinal(obj);
        }
    }, [data]);

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (data: editI) => { return editCategories(data) },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['SubjectSection', 'subject'],
            })
        }
    })

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
            <CategoryBody data={dataFinal} type={'subject'} mutation={mutation} />
        )
    }

}

export default SubjectSection