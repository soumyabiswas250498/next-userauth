import React, { useEffect, useState } from 'react';
import useAdminHook from '@/src/hooks/useAdminHook';
import CategoryBody from './Body';
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

function ExamSection() {
    const [dataFinal, setDataFinal] = useState([{ id: '1', label: '' }]);
    const [selectedSection, setSelectedSection] = useState('');
    const { fetchCategories, editCategories, addCategories, deleteCategory } = useAdminHook();
    const [success, setSuccess] = useState(false);


    const { data: dataExam, isLoading: isLoadingExam, isError, error } = useQuery({
        queryKey: ['ExamSection', 'exam', selectedSection],
        queryFn: ({ queryKey }) => fetchCategories(queryKey[1], selectedSection),
        enabled: !!selectedSection
    });

    const { data: itemSections, isLoading: isLoadingSections } = useQuery({
        queryKey: ['SectionsSection', 'section'],
        queryFn: ({ queryKey }) => fetchCategories(queryKey[1])
    });


    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (data: any) => { return data.isEdit ? editCategories(data) : addCategories({ ...data, section: selectedSection }) },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['ExamSection', 'exam'],
            });
            setSuccess(true);
        }
    })

    useEffect(() => {
        if (dataExam) {
            const obj = dataExam.map((item: any) => { return { id: item._id, label: item.exam } }); setDataFinal(obj);
        }
    }, [dataExam]);

    const deleteFunc = async (id: string, type: string) => {
        const res: any = await deleteCategory(id, type);
        if (res?.data?.success) {
            queryClient.invalidateQueries({
                queryKey: ['ExamSection', 'exam'],
            })
            setSuccess(true);
        }
    }


    return (
        <>
            {isLoadingExam && isLoadingSections ? <Skeleton className="h-8 w-[250px]" /> :
                <div className='px-4 pt-2'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='border border-primary/50 px-3 py-1.5 rounded'>{selectedSection || 'Select Section'}</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {itemSections && itemSections.map((item: any) => <DropdownMenuItem key={item._id} onClick={() => setSelectedSection(item.section)} >{item.section}</DropdownMenuItem>)}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            }
            {isLoadingExam ?
                <div className='flex flex-col gap-2 p-3'>
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                </div>
                :
                dataExam && <CategoryBody data={dataFinal} type={'exam'} mutation={mutation} deleteFunc={deleteFunc} success={success} setSuccess={setSuccess} />
            }
        </>
    )
}

export default ExamSection