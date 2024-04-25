'use client'
import React, { useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useFormik } from 'formik';
import { questionForm } from '@/src/schemas/LoginRegisterSchema';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import useFirstEvent from '@/src/hooks/useFirstEvent';
import LinkedMenu from '@/src/components/linkedMenu/LinkedMenu';
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from 'sonner';



const initialValues = {
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    explaination: '',
    correctOption: -1,
    selectedSubject: '',
    selectedTopic: '',
    selectedSection: '',
    selectedExam: ''
}

function AddQuestionForm() {
    const [subjects, setSubjects]: any = useState();
    const [sections, setSections]: any = useState();
    const { categoryApiCalls } = useFirstEvent()

    useEffect(() => {
        categoryApiCalls().then((data) => { const { subjectObj, sectionObj } = data; setSubjects(subjectObj); setSections(sectionObj) });
    }, [])



    const { errors, touched, values, handleChange, handleBlur, setFieldValue, handleSubmit, resetForm } = useFormik({
        initialValues,
        validationSchema: questionForm,
        onSubmit: () => {
            console.log(values, '***v')
        }
    })

    useEffect(() => {
        if (errors.correctOption && touched.correctOption) {
            toast.error('Select the correct option');
        }

    }, [errors.correctOption, touched.correctOption])



    return (
        <div className='border'>
            <div className='w-full flex justify-center items-center text-2xl py-4'>
                Add New Question
            </div>
            <form className='w-full px-4 ' onSubmit={handleSubmit}>
                <div className='flex flex-col lg:flex-row justify-center items-center gap-2'>
                    <div className='w-full lg:w-8/12 border rounded p-2'>
                        <div className='py-1'>
                            <p>Question :</p>
                            <Textarea
                                placeholder="Type your question."
                                rows={3}
                                className='my-1'
                                name='question'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.question}
                            />
                            {!!(touched.question && errors.question) ? <p className='text-red-500 text-sm '>{errors.question}</p> : <p className='text-sm'>&nbsp;</p>}
                        </div>
                        <div className='py-1'>
                            <div className='flex justify-between items-center'>
                                <p>Option 1 :</p>
                                <Checkbox checked={!!(values.correctOption === 0)} onCheckedChange={() => setFieldValue('correctOption', 0)} />
                            </div>
                            <Textarea
                                placeholder="Type option one."
                                rows={3}
                                className='my-1'
                                name='option1'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.option1}
                            />
                            {!!(touched.option1 && errors.option1) ? <p className='text-red-500 text-sm '>{errors.option1}</p> : <p className='text-sm'>&nbsp;</p>}

                        </div>
                        <div className='py-1'>
                            <div className='flex justify-between items-center'>
                                <p>Option 2 :</p>
                                <Checkbox checked={!!(values.correctOption === 1)} onCheckedChange={() => setFieldValue('correctOption', 1)} />
                            </div>
                            <Textarea
                                placeholder="Type option one."
                                rows={3}
                                className='my-1'
                                name='option2'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.option2}
                            />
                            {!!(touched.option2 && errors.option2) ? <p className='text-red-500 text-sm '>{errors.option2}</p> : <p className='text-sm'>&nbsp;</p>}
                        </div>
                        <div className='py-1'>
                            <div className='flex justify-between items-center'>
                                <p>Option 3 :</p>
                                <Checkbox checked={!!(values.correctOption === 2)} onCheckedChange={() => setFieldValue('correctOption', 2)} />
                            </div>
                            <Textarea
                                placeholder="Type option two."
                                rows={3}
                                className='my-1'
                                name='option3'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.option3}
                            />
                            {!!(touched.option3 && errors.option3) ? <p className='text-red-500 text-sm '>{errors.option3}</p> : <p className='text-sm'>&nbsp;</p>}
                        </div>
                        <div className='py-1'>
                            <div className='flex justify-between items-center'>
                                <p>Option 4 :</p>
                                <Checkbox checked={!!(values.correctOption === 3)} onCheckedChange={() => setFieldValue('correctOption', 3)} />
                            </div>
                            <Textarea
                                placeholder="Type option three."
                                rows={3}
                                className='my-1'
                                name='option4'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.option4}
                            />
                            {!!(touched.option4 && errors.option4) ? <p className='text-red-500 text-sm '>{errors.option4}</p> : <p className='text-sm'>&nbsp;</p>}
                        </div>
                        <div className='py-1'>
                            <p>Explaination :</p>
                            <Textarea
                                placeholder="Type option three."
                                rows={3}
                                className='my-1'
                                name='explaination'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.explaination}
                            />
                            {!!(touched.explaination && errors.explaination) ? <p className='text-red-500 text-sm '>{errors.explaination}</p> : <p className='text-sm'>&nbsp;</p>}
                        </div>

                    </div>
                    <div className='w-full lg:w-4/12 border rounded p-2'>
                        {subjects ? <LinkedMenu data={subjects} name1={'selectedSubject'} name2={'selectedTopic'} label1={'Select Subject'} label2={'Select Topic'} setFieldValue={setFieldValue} handleBlur={handleBlur} touched={touched} errors={errors} /> :
                            <div className="space-y-2 py-1">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        }
                        {
                            sections ? <LinkedMenu data={sections} label1={'Select Section'} label2={'Select Exam'} name1={'selectedSection'} name2={'selectedExam'} setFieldValue={setFieldValue} handleBlur={handleBlur} touched={touched} errors={errors} /> :
                                <div className="space-y-2 py-1">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                        }
                    </div>
                </div>
                <div className='w-full flex justify-center items-center my-2'>
                    <Button variant={'default'} type={'submit'} className='mt-1 w-24' disabled={false} >
                        {false ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Submit'}
                    </Button>
                </div>

            </form>
        </div>
    )
}

export default AddQuestionForm