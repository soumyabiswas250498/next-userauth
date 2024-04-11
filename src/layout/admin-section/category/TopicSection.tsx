import React, { useEffect, useState } from 'react'
import useAdminHook from '@/src/hooks/useAdminHook'
import CategoryBody from './Body';
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { editI } from '@/src/hooks/useAdminHook';


function TopicSection() {
    const [selectedSubject, setSelectedSubject] = useState('');
    const [dataFinal, setDataFinal] = useState([{ id: '1', label: '' }]);
    const [success, setSuccess] = useState(false);

    const { fetchCategories, editCategories, addCategories, deleteCategory } = useAdminHook();

    const { data: itemSubject, isLoading: isLoadingSubject, isError } = useQuery({
        queryKey: ['SubjectSection', 'subject'],
        queryFn: ({ queryKey }) => fetchCategories(queryKey[1])
    });

    const { data: dataTopic, isLoading } = useQuery({
        queryKey: ['TopicSection', 'topic', selectedSubject],
        queryFn: ({ queryKey }) => fetchCategories(queryKey[1], selectedSubject),
        enabled: !!selectedSubject
    });


    useEffect(() => {
        if (dataTopic) {
            const obj = dataTopic.map((item: any) => { return { id: item._id, label: item.topic } }); setDataFinal(obj);
        }
    }, [dataTopic])

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (data: any) => { return data.isEdit ? editCategories(data) : addCategories({ ...data, subject: selectedSubject }) },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['TopicSection', 'topic', selectedSubject],
            })
        }
    })

    const deleteFunc = async (id: string, type: string) => {
        const res: any = await deleteCategory(id, type);
        if (res?.data?.success) {
            queryClient.invalidateQueries({
                queryKey: ['TopicSection', 'topic', selectedSubject],
            })
            setSuccess(true);
        }
    }

    return (
        <>
            {isLoading && isLoadingSubject ? <Skeleton className="h-8 w-[250px]" /> :
                <div className='px-4 pt-2'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='border border-primary/50 px-3 py-1.5 rounded'>{selectedSubject || 'Select Subject'}</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {itemSubject && itemSubject.map((item: any) => <DropdownMenuItem key={item._id} onClick={() => setSelectedSubject(item.subject)} >{item.subject}</DropdownMenuItem>)}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            }
            {isLoading ?
                <div className='flex flex-col gap-2 p-3'>
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                </div>
                :
                dataTopic && <CategoryBody data={dataFinal} type={'topic'} mutation={mutation} deleteFunc={deleteFunc} success={success} setSuccess={setSuccess} />
            }
        </>



    )
}

export default TopicSection