import nodemailer from 'nodemailer';
import randomstring from "randomstring";
import CryptoJS from "crypto-js";
import { saveOtpToken } from '../services/user.service';
import { ApiError } from './ApiError';
import { otpLength, seperator } from './constants';


// Encryption with AES
function encryptAES(text: string) {
    try {
        const data = CryptoJS.AES.encrypt(
            JSON.stringify(text),
            process.env.NEXT_PUBLIC_CLIENT_SECRET as string
        ).toString();
        return data;
    } catch (e) {
        throw new ApiError(
            500,
            'Something went wrong while encrypting'
        );
    }
}

// Decryption with AES
function decryptAES(encryptedText: string) {
    try {
        console.log(encryptedText, '***')
        const bytes = CryptoJS.AES.decrypt(encryptedText, process.env.NEXT_PUBLIC_CLIENT_SECRET as string);
        const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return data

    } catch (e) {
        console.log(e)
        throw new ApiError(
            500,
            'Something went wrong while decrypting'
        );

    }
}

function generateOtp() {
    return randomstring.generate(otpLength);
}

function currentTime() {
    return Math.floor(Date.now() / 1000);
}

async function sendActivationEmail(email: string) {
    const otp = generateOtp();
    const time = currentTime();
    const str = `${otp}${seperator}${time}`
    console.log(str)
    const token = encryptAES(str)
    const transporter = nodemailer.createTransport({
        //@ts-ignore
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASS
        }
    })

    const mailOptions = {
        from: 'gkquiz.com',
        to: email,
        subject: "Emal Verification",
        html: `To verify your account click on the link ${process.env.DOMAIN}/auth/activate?token=${otp}`
    }

    try {
        const confirmEmail: string | undefined = await saveOtpToken(email, token);
        if (confirmEmail !== email) {
            throw new ApiError(
                500,
                'Something went wrong while generating otp 2'
            );
        }
    } catch (error) {
        throw new ApiError(
            500,
            'Something went wrong while generating otp 3'
        );
    }

    try {

        await transporter.sendMail(mailOptions)

    } catch (error) {
        throw new ApiError(
            500,
            'Something went wrong while sending otp email'
        );
    }

}
async function sendPassResetEmail(email: string) {
    try {
        const transporter = nodemailer.createTransport({
            //@ts-ignore
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASS
            }
        })

        const mailOptions = {
            from: 'gkquiz.com',
            to: email,
            subject: "Emal Verification",
            html: ``
        }
        await transporter.sendMail(mailOptions)

    } catch (error) {
        console.log(error)
    }

}

export { sendActivationEmail, sendPassResetEmail, encryptAES, decryptAES, generateOtp }
