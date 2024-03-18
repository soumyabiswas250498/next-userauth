"use client"
import React, { useState } from 'react'
import LoginSection from './LoginSection'
import RegisterSection from './RegisterSection'

export default function LoginRegister() {
    const [pageType, setPageType] = useState('login')
    return (
        <div className='w-full h-full'>
            <div className='flex w-full h-10 justify-center items-center'>
                <div className={` w-1/2 flex justify-center rounded-tl items-center h-10 cursor-pointer select-none ${pageType === 'login' ? 'bg-primary/80 text-primary-foreground border-primary/70 font-semibold' : 'border-b border-primary/70'}`} onClick={() => setPageType('login')}>
                    <p>Login</p>
                </div>
                <div className={` w-1/2 flex justify-center rounded-tr items-center h-10 cursor-pointer select-none ${pageType === 'register' ? 'bg-primary/80 text-primary-foreground border-primary/70 font-semibold' : 'border-b border-primary/70'}`} onClick={() => setPageType('register')}>
                    <p>Register</p>
                </div>
            </div>
            <div className='w-full p-4' style={{ height: 'calc(100% - 40px)' }}>
                {pageType==='login' && <LoginSection /> }
                {pageType==='register' && <RegisterSection /> }

            </div>
        </div>
    )
}
