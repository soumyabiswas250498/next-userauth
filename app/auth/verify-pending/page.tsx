"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Loader2 } from "lucide-react"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
interface CircularProgressProps {
    size: number;
    progress: number;
    total: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ size, progress, total }) => {
    const [offset, setOffset] = useState(0);
    const circleRadius = size / 2 - 5;
    const circumference = 2 * Math.PI * circleRadius;

    useEffect(() => {
        const progressOffset = ((total - progress) / total) * circumference;
        setOffset(progressOffset);
    }, [progress, circumference]);

    return (
        <svg width={size} height={size}>
            <circle
                cx={size / 2}
                cy={size / 2}
                r={circleRadius}
                fill="none"
                stroke="#ddd"
                strokeWidth="2"
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={circleRadius}
                fill="none"
                stroke="#00E2E6"
                strokeWidth="2"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
        </svg>
    );
};

const VerifyPending: React.FC = () => {
    const totalTime: number = 60;
    const [counter, setCounter] = useState<number>(totalTime);
    const [email, setEmail] = useState<string | null>(null);
    const isLoading = false;
    const router = useRouter()

    useEffect(() => {
        const id = setTimeout(() => {
            setCounter((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => {
            clearTimeout(id);
        };
    }, [counter]);
    useEffect(()=>{
        const email: string | null = localStorage.getItem('EmailVerify');
        if(email){
            setEmail(email)
        }else{
            router.push('/')
        }
    },[])
    // console.log(email)
    return (
        <div className='w-full h-[80vh] flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center p-2 gap-2'>
                {counter === 0 ? <p className='text-center'>The verification link we sent is expired. Click on Resend Button and try again.</p>
                    :
                    <p className='text-center'>An email with a verification link has been sent to {email}. Please verify by clicking the link and continue.</p>}
                <Image src={'/email-sent.gif'} alt='email sent' width={120} height={120} />
                {
                    counter === 0 ?
                        <Button variant={'default'} type={'submit'} className='mt-1' disabled={isLoading} onClick={() => { setCounter(totalTime) }} >
                            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Resend'}
                        </Button>
                        :
                        <div className='relative'>
                            <CircularProgress size={80} progress={counter} total={totalTime} />
                            <p className='absolute h-full w-full top-0 left-0 flex justify-center items-center text-sm'>{counter} Sec</p>
                        </div>
                }
            </div>
        </div>
    );
};

export default VerifyPending;
