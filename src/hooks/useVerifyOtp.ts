import React, { useEffect, useState } from 'react';
import { tokenExpiryTime } from '@/src/__server__/utils/constants';
import { decryptClientData, isTokenExpired } from '@/src/helper/useEncryption';
import { useRouter } from 'next/navigation';
import useAuthHook from '@/src/hooks/useAuthHook';
import { toast } from 'sonner';
import { seperator } from '@/src/__server__/utils/constants';
import { saveEncryptedEmailLocalStorage } from '@/src/helper/useEncryption';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useVerifyOtp = () => {
    const totalTime: number = tokenExpiryTime;
    const [counter, setCounter] = useState<number>(totalTime);
    const [email, setEmail] = useState<string | null>(null);
    // const isLoading = false;
    const router = useRouter();
    const { verifyRequest, resendVerificationEmail } = useAuthHook();
    const { isLoading, success, data } = useSelector((state: RootState) => state.resendOtpData)

    const sendOtpForVerification = (otp: string) => {
        if (email && otp.length === 7) {
            verifyRequest(email, otp)
        }
    }

    const resendOtp = async () => {
        const res = await resendVerificationEmail();
        if (success && email) {
            saveEncryptedEmailLocalStorage(email)
            setCounter(tokenExpiryTime);
        }
    }

    useEffect(() => {
        const id = setTimeout(() => {
            setCounter((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => {
            clearTimeout(id);
        };
    }, [counter]);

    useEffect(() => {
        const data: string | null = localStorage.getItem('EmailVerify');
        if (data) {
            const str: string = decryptClientData(data);
            if (str === 'failed') {
                toast.warning('Unauthorized access.');
                localStorage.removeItem('EmailVerify');
                router.push('/')
            }
            const [email, time] = str.split(seperator)
            setEmail(email);

            const isExpired = isTokenExpired(parseInt(time), tokenExpiryTime);
            if (isExpired) {
                setCounter(0)
                toast.warning('Link expired. Resend Email')
            } else {
                const currentTime = Date.now() / 1000;
                const timeSpend = Math.floor(currentTime - parseInt(time))
                if (timeSpend > 10) {
                    setCounter(totalTime - timeSpend)
                }
            }
        } else {
            toast.warning('No verification is pending.');
            router.push('/auth/login')
        }
    }, [])

    return { isLoading, email, setCounter, counter, sendOtpForVerification, resendOtp }
}