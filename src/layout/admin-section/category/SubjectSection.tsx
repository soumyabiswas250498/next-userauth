import React, { useEffect, useState } from 'react'
import useAdminHook from '@/src/hooks/useAdminHook'
import CategoryBody from './Body';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/store';
import { Skeleton } from "@/components/ui/skeleton"


function SubjectSection() {
    const [dataFinal, setDataFinal] = useState([{ _id: '1', label: '' }])
    const { getCategoriesData } = useAdminHook();
    const { isLoading, error, dataSubject } = useSelector((state: RootState) => state.categoryData)
    useEffect(() => {
        if (dataSubject.length) {
            const obj = dataSubject.map((item: any) => { return { id: item._id, label: item.subject } }); setDataFinal(obj)
        } else {
            getCategoriesData({ type: 'subject' })
        }
    }, [dataSubject.length]);



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
            <CategoryBody data={dataFinal} type={'subject'} />
        )
    }

}

export default SubjectSection