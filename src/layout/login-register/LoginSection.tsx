"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react';
import { useFormik } from "formik";
import { loginSchema } from '@/src/schemas/LoginRegisterSchema';
import {  signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';


const initialValues = {
    email: '',
    password: ''
}

async function signInHandler(email: string, pass: string) {
    const result = await signIn('credentials', {redirect: false, email: email, password: pass })
    console.log(result)
    return result;
}

export default function LoginSection() {
    const router = useRouter();
    const {errors, touched, values, handleChange, handleBlur, handleSubmit, resetForm} =  useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: async ()=>{
            console.log(values)
            const result = await signInHandler(values.email, values.password);
            if(!result?.error){
                router.push('/')
            }

           
        }
    });
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <form action="" onSubmit={handleSubmit} className=' w-full lg:w-5/12 flex flex-col'>
                <div className='flex flex-col'>
                    <label htmlFor="email" className='text-sm'>Enter Email ID: </label>
                    <Input className='border-primary/50 ring-primary/90 my-1' placeholder='Email Id' id='email' value={values.email} name='email' onChange={handleChange} onBlur={handleBlur} />
                    {touched.email && errors.email ? <p className='text-xs text-red-600 ml-1'>{errors.email}</p> : <p className="text-xs" > &nbsp; </p>}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password" className='text-sm'>Enter Password: </label>
                    <Input className='border-primary/50 ring-primary/90 my-1' placeholder='Password' id='password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                    {touched.password && errors.password ? <p className='text-xs text-red-600 ml-1'>{errors.password}</p> : <p className="text-xs" > &nbsp; </p>}
                </div>
                <Button variant={'default'} type={'submit'} className='mt-1' > Login </Button>
            </form>

        </div>
    )
}
