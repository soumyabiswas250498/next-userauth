"use client"
import Image from 'next/image';
import React from 'react';
import { Loader2 } from "lucide-react"
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { TimeCount } from '@/src/components/timeCount/TimeCount';
import { useVerifyOtp } from '@/src/hooks/useVerifyOtp';
import { tokenExpiryTime } from '@/src/__server__/utils/constants';
import OtpInput from '@/src/components/otpInput/OtpInput';

const VerifyPending: React.FC = () => {

    const { isLoading, email, counter, sendOtpForVerification, resendOtp } = useVerifyOtp()




    return (
        <div className='w-full h-[80vh] flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center p-2 gap-2'>
                {counter === 0 ? <p className='text-center'>The verification link we sent to {email} is expired. Click on Resend Button and try again.</p>
                    :
                    <p className='text-center'>An email with a verification link has been sent to {email}. Please verify by clicking the link and continue.</p>}
                <Image src={'/email-sent.gif'} alt='email sent' width={120} height={120} />
                {
                    counter === 0 ?
                        <Button variant={'default'} type={'submit'} className='mt-1' disabled={isLoading} onClick={() => { resendOtp(); }} >
                            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Resend'}
                        </Button>
                        :
                        <div className='relative flex flex-col justify-center items-center gap-4'>
                            <TimeCount size={80} progress={counter} total={tokenExpiryTime} />
                            <OtpInput onOtpSubmit={(e: string) => { sendOtpForVerification(e) }} />
                        </div>
                }
            </div>
        </div>
    );
};

export default VerifyPending;
