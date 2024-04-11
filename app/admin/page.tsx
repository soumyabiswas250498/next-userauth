import React from 'react'
import { Button } from "@/components/ui/button";
import Link from 'next/link';


function DashBoard() {
    return (
        <div className='w-full flex flex-col justify-center items-center mt-10 gap-2' >
            <Button asChild variant={'link'} className="w-28 border-primary" >
                <Link href='/admin/questions/add'>Add Questions</Link>
            </Button>
            <Button asChild variant={'link'} className="w-28 border-primary" >
                <Link href='/admin/questions'>View / Edit / Delete Questions</Link>
            </Button>
            <Button asChild variant={'link'} className="w-28 border-primary" >
                <Link href='/admin/categories'>View / Edit / Delete Categories</Link>
            </Button>
            <Button variant={'link'} className="w-28 border-primary">Users</Button>
        </div>
    )
}

export default DashBoard