import React, { useEffect, useState } from 'react'
import useAdminHook from '@/src/hooks/useAdminHook'
import CategoryBody from './Body';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/store';
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


function TopicSection() {
    const { getCategoriesData } = useAdminHook();
    const [selectedSubject, setSelectedSubject] = useState('');
    const [dataFinal, setDataFinal] = useState([{ _id: '1', label: '' }]);
    const { isLoading, error, dataSubject, dataTopic } = useSelector((state: RootState) => state.categoryData);
    useEffect(() => {
        if (!dataSubject.length) {
            getCategoriesData({ type: 'subject' });
        }
    }, [dataSubject.length]);

    useEffect(() => {
        if (selectedSubject) {
            getCategoriesData({ type: 'topic', subject: selectedSubject });
        }
    }, [selectedSubject])

    useEffect(() => {
        if (dataTopic.length) {
            const obj = dataTopic.map((item: any) => { return { id: item._id, label: item.topic } }); setDataFinal(obj);
        }
    }, [dataTopic[0]?._id])

    return (
        <>
            {isLoading && !dataSubject[0]._id ? <Skeleton className="h-8 w-[250px]" /> :
                <div className='px-4 pt-2'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='border border-primary/50 px-3 py-1.5 rounded'>{dataTopic[0]?.subject || selectedSubject || 'Select Subject'}</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {dataSubject.map((item: any) => <DropdownMenuItem key={item._id} onClick={() => setSelectedSubject(item.subject)} >{item.subject}</DropdownMenuItem>)}
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
                dataTopic[0]?._id && <CategoryBody data={dataFinal} type={'topic'} />
            }
        </>



    )
}

export default TopicSection