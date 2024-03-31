import React, { useEffect } from 'react'
import useAdminHook from '@/src/hooks/useAdminHook'
import CategoryBody from './Body';

function SubjectSection() {
    const { getCategoriesData } = useAdminHook();
    useEffect(() => { getCategoriesData() }, []);
    const data = [{
        id: '1',
        label: 'Physics'
    }, {
        id: '2',
        label: 'Chemistry'
    }, {
        id: '3',
        label: 'Math'
    }]
    return (
        <div >
            <CategoryBody data={data} type={'subject'} />

        </div>
    )
}

export default SubjectSection