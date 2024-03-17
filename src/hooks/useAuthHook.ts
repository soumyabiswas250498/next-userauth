import axios from "axios";
import { useDispatch } from 'react-redux';
import { setLoadingRegister, setErrorRegister, setSuccessRegister, setDataRegister } from "../store/reducers/registerSlice";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { encryptClientData, saveEncryptedEmailLocalStorage } from "../helper/useEncryption";
import { seperator } from "../__server__/utils/constants";
import { setLoadingresendOtp, setErrorresendOtp, setSuccessresendOtp, setDataresendOtp } from "../store/reducers/resendOtpSlice";

interface UserData {
    name: string;
    userName: string;
    email: string;
    password: string;
    confPassword: string;
}

const useAuthHook = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    async function handleRegistration(data: UserData) {
        const userData = {
            username: data.userName,
            fullname: data.name,
            password: data.password,
            email: data.email
        }
        try {
            dispatch(setLoadingRegister(true))
            const res = await axios.post('/api/users/register', userData);
            saveEncryptedEmailLocalStorage(res.data.data.email)
            dispatch(setLoadingRegister(false))
            dispatch(setSuccessRegister(true))
            toast.success('Registration successful. Now Verify your account.');
            dispatch(setDataRegister(res.data.data.email))

        } catch (error: any) {
            console.log(error.response.data.message)
            if (error.response.data.message === 'User is not verified yet.') {
                saveEncryptedEmailLocalStorage(data.email, true);
                router.push('/auth/verify-pending')
            }
            dispatch(setLoadingRegister(false))
            dispatch(setErrorRegister(true))
            toast.error(error.response.data?.message);
        }
    }

    async function verifyRequest(email: string, otp: string) {
        const res = await axios.post('/api/users/verify', { otp: otp, email: email });
        if (res.data === 'success') {
            toast.success('User verification successful');
            localStorage.removeItem('EmailVerify')
            router.push('/auth/login')
        } else if (res.data === 'expired') {
            toast.warning('Email expired. Resend and try again.')
            router.push('/auth/verify-pending')
        } else {
            toast.error('Invalid token.')
            router.push('/')
        }
    }

    async function resendVerificationEmail() {
        try {
            dispatch(setLoadingresendOtp(true))
            const str = localStorage.getItem('EmailVerify')
            const res = await axios.post('/api/users/resend-verification-email', { data: str });
            dispatch(setLoadingresendOtp(false));
            dispatch(setSuccessresendOtp(true));
            dispatch(setDataresendOtp(res?.data))
            toast.success('Verification Email Sent')
            return res;
        } catch (error: any) {
            dispatch(setLoadingresendOtp(false))
            toast.error(error.response.data.message)
        }


    }

    return { handleRegistration, verifyRequest, resendVerificationEmail };
}

export default useAuthHook;
