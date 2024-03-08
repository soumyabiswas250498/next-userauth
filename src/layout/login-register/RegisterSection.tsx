import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react';
import { useFormik } from "formik";
import { regSchema } from '@/src/schemas/LoginRegisterSchema';

const initialValues = {
  name: '',
  userName: '',
  email: '',
  password: '',
  confPassword: ''
}

function RegisterSection() {
  const { errors, touched, values, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues: initialValues,
    validationSchema: regSchema,
    onSubmit: () => {
      console.log(values)
    }
  });

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <form action="" onSubmit={handleSubmit} className=' w-full lg:w-5/12 flex flex-col'>
        <div className='flex flex-col'>
          <label htmlFor="name" className='text-sm'>Enter Full Name: </label>
          <Input className='border-primary/50 ring-primary/90 my-[2px]' placeholder='Full Name' id='name' value={values.name} name='name' onChange={handleChange} onBlur={handleBlur} />
          {touched.name && errors.name ? <p className='text-xs text-red-600 ml-1'>{errors.name}</p> : <p className="text-xs" > &nbsp; </p>}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="userName" className='text-sm'>Enter User Name: </label>
          <Input className='border-primary/50 ring-primary/90 my-[2px]' placeholder='User Name' id='userName' value={values.userName} name='userName' onChange={handleChange} onBlur={handleBlur} />
          {touched.userName && errors.userName ? <p className='text-xs text-red-600 ml-1'>{errors.userName}</p> : <p className="text-xs" > &nbsp; </p>}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="email" className='text-sm'>Enter Email ID: </label>
          <Input className='border-primary/50 ring-primary/90 my-[2px]' placeholder='Email Id' id='email' value={values.email} name='email' onChange={handleChange} onBlur={handleBlur} />
          {touched.email && errors.email ? <p className='text-xs text-red-600 ml-1'>{errors.email}</p> : <p className="text-xs" > &nbsp; </p>}
        </div>
        <div className='flex justify-center items-center gap-2'>

          <div className='flex flex-col'>
            <label htmlFor="password" className='text-sm'>Enter Password: </label>
            <Input className='border-primary/50 ring-primary/90 my-[2px]' placeholder='Password' id='password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
            {touched.password && errors.password ? <p className='text-xs text-red-600 ml-1'>{errors.password}</p> : <p className="text-xs" > &nbsp; </p>}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="confPassword" className='text-sm'>Confirm Password: </label>
            <Input className='border-primary/50 ring-primary/90 my-[2px]' placeholder='Confirm Password' id='confPassword' value={values.confPassword} onChange={handleChange} onBlur={handleBlur} />
            {touched.confPassword && errors.confPassword ? <p className='text-xs text-red-600 ml-1'>{errors.confPassword}</p> : <p className="text-xs" > &nbsp; </p>}

          </div>
        </div>
        <Button variant={'default'} type={'submit'} className='mt-1' > Register </Button>

      </form>
    </div>

  )
}

export default RegisterSection