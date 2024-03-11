import axios from "axios";
import { useDispatch } from 'react-redux';
import { setLoadingRegister, setErrorRegister, setSuccessRegister, setDataRegister } from "../store/reducers/registerSlice";

interface UserData {
    name: string;
    userName: string;
    email: string;
    password: string;
    confPassword: string;
}

const useAuthHook = () => {
    const dispatch = useDispatch();
    async function handleRegistration(data: UserData) {
        const userData =  {
            username: data.userName,
            fullname: data.name,
            password: data.password,
            email: data.email
        }
        try {
            dispatch(setLoadingRegister(true))
            const res = await axios.post('/api/users/register', userData);
            dispatch(setLoadingRegister(false))
            dispatch(setSuccessRegister(true))
            console.log(res)
            localStorage.setItem('EmailVerify',res.data.data.email )
            dispatch(setDataRegister(res.data.data.email))
            
        } catch (error) {
            dispatch(setLoadingRegister(false))
            dispatch(setErrorRegister(true))
            console.error('Error registering user:', error);
            throw error;
        }
    }
    async function verifyRequest(token: string) {
        const res = await axios.post('/api/users/verify',{token: token});
    }

    return { handleRegistration, verifyRequest };
}

export default useAuthHook;
