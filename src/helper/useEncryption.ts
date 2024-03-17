import CryptoJS from "crypto-js";
import { seperator } from "../__server__/utils/constants";

export const encryptClientData = (text: string) => {
    try {
        // console.log(process.env.NEXT_PUBLIC_CLIENT_SECRET)
        const data = CryptoJS.AES.encrypt(
            JSON.stringify(text),
            process.env.NEXT_PUBLIC_CLIENT_SECRET as string
        ).toString();
        // console.log(data, '***')
        return data;

    } catch (e) {
        console.log(e)
        return undefined;
    }

};


export const decryptClientData = (text: string) => {
    try {
        const bytes = CryptoJS.AES.decrypt(text, process.env.NEXT_PUBLIC_CLIENT_SECRET as string);
        const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return data

    } catch (e) {
        console.log(e)
        return undefined

    }

};



export const isTokenExpired = (tokenTime: number, expiryTime: number) => {
    const currentTime = Date.now() / 1000;
    return ((currentTime - tokenTime) > expiryTime);

}

export const saveEncryptedEmailLocalStorage = (email: string, isExpired?: boolean) => {
    const currentTime = isExpired ? 1679061226 : Date.now() / 1000;
    const str = `${email}${seperator}${currentTime}`
    const encryptedStr = encryptClientData(str)
    localStorage.setItem('EmailVerify', encryptedStr as string)

}