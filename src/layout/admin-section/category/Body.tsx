import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import React, { useEffect, useState } from 'react';
import Modal from "@/src/components/Modal";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormik } from "formik";
import { categoryForm } from "@/src/schemas/LoginRegisterSchema";

interface Iprops {
    data: [{ id: string, label: string }]
}



function Form(props: any) {
    const { type, edit, setEdit, mutation } = props;
    const [isEdit, setIsEdit] = useState(false);

    const { errors, touched, values, handleChange, handleBlur, setFieldValue, handleSubmit, resetForm } = useFormik({
        initialValues: { label: '' },
        validationSchema: categoryForm,
        onSubmit: () => {
            mutation.mutate({ isEdit: isEdit, type: type, id: edit.id, newLabel: values.label })
        }
    });

    useEffect(() => {
        if (edit.id !== '') {
            setIsEdit(true);
            setFieldValue('label', edit.label)
        } else {
            setIsEdit(false);
        }
    }, [edit.id])

    return (
        <div className="w-full h-fit">
            <h1 className="capitalize">{isEdit ? 'Edit' : 'Add'} {type}</h1>

            <div className="flex flex-col lg:flex-row lg:items-center w-full p-4 gap-4">
                <h2>Label : </h2>
                <div>
                    <input name="label" value={values.label} onChange={handleChange} onBlur={handleBlur} placeholder="" type="text" className="px-2 py-1 rounded" />
                </div>
            </div>
            <div className="w-full px-4">
                {errors.label && touched.label && <p className="text-red-500 text-sm">{errors.label}</p>}
            </div>

            <div className="w-full flex justify-end gap-4">
                <Button variant={'outline'} type={'submit'} className='mt-1 w-24' disabled={mutation?.isPending} onClick={() => handleSubmit()} >
                    {mutation?.isPending ? <Loader2 className="h-6 w-6 animate-spin" /> : isEdit ? 'Edit' : 'Add'}
                </Button>
                <Button variant={'destructive'} className='mt-1 w-24' onClick={() => { setEdit({ id: '', label: '' }); resetForm() }} >
                    {'Cancel'}
                </Button>

            </div>

        </div>)
}

function CategoryBody(props: any) {
    const { data, type, mutation } = props;
    const [edit, setEdit] = useState({ id: '', label: '' });
    const [deleteModal, setDeleteModal] = useState({ id: '', label: '' })
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isLoading = false;

    useEffect(() => {
        if (deleteModal.id !== '') {
            setIsModalOpen(true)
        }
    }, [deleteModal.id])
    useEffect(() => {
        if (!isModalOpen) {
            setDeleteModal({ id: '', label: '' })
        }
    }, [isModalOpen])

    return (
        <div className='w-full p-4 flex flex-col lg:flex-row justify-between gap-2'>
            <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} >
                <div className="flex flex-col">
                    <h2>Are you sure to delete {deleteModal.label} ? </h2>
                    <div className="w-full flex justify-end gap-4">
                        <Button variant={'outline'} type={'submit'} className='mt-1' disabled={isLoading} >
                            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Yes'}
                        </Button>
                        <Button variant={'destructive'} type={'submit'} className='mt-1' onClick={() => { setIsModalOpen(false) }} >
                            {'No'}
                        </Button>

                    </div>
                </div>
            </Modal>
            <div className='w-full lg:w-1/2 h-fit border p-2 rounded'>
                <Form type={type} edit={edit} setEdit={setEdit} mutation={mutation} />
            </div>
            <div className='w-full lg:w-1/2 border p-2 rounded'>
                {data.map((item: any) => <div key={item.id} className='border p-2 my-1 hover:bg-slate-800/20 cursor-pointer select-none duration-300 ease-in-out flex justify-between'>
                    <div className="w-full hover:text-primary">
                        {item.label}
                    </div>
                    <div className="w-fit flex justify-between px-4 gap-4">
                        <CiEdit onClick={() => { setEdit({ id: item.id, label: item.label }) }} className="hover:text-orange-600 text-xl duration-200 ease-in-out" />
                        <MdDeleteForever onClick={() => { setDeleteModal({ id: item.id, label: item.label }) }} className="hover:text-red-500 text-xl duration-200 ease-in-out" />
                    </div>

                </div>)}
            </div>
        </div>
    )
}

export default CategoryBody