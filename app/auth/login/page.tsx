
import React from 'react'
import LoginRegister from '@/src/layout/login-register/LoginRegister'

function page() {

    return (
        <div className='w-full px-4 py-8 lg:py-0 h-[80vh] flex justify-center items-center '>
            <div className='w-full h-2/3 md:px-0 lg:w-7/12 lg:h-5/6 border-[2px] border-primary/50 rounded-md'>

                <LoginRegister />

            </div>


        </div>
    )
}

export default page