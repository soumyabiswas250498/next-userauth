import React, { useEffect } from 'react'
import useAdminHook from '@/src/hooks/useAdminHook'

function SubjectSection() {
    const { getCategoriesData } = useAdminHook();
    useEffect(() => { getCategoriesData() }, [])
    return (
        <div>SubjectSection</div>
    )
}

export default SubjectSection