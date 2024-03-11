import nodemailer from 'nodemailer';
// const crypto = require('crypto');
import crypto from 'crypto'


interface VerifyI {
    email?: string,
    userId?: string,
}

// Encryption with AES
function encryptAES(text: string, password : string) {
    const key = crypto.scryptSync(password, "salt", 32);
    const iv = Buffer.alloc(16, 0); // Initialization vector
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  }

// Decryption with AES
function decryptAES(encryptedText : string, password : string) {
    const key = crypto.scryptSync(password, "salt", 32);
    const iv = Buffer.alloc(16, 0); // Initialization vector
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }

async function sendActivationEmail({ email, userId }: VerifyI) {
    try {
        const str = `${email},${Math.floor(Date.now() / 1000)}`
        const token = encryptAES(str, process.env.SECRET as string)
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
            html: `To verify your account click on the link ${process.env.DOMAIN}/auth/activate?token=${token}`
        }
        await transporter.sendMail(mailOptions)

    } catch (error) {
        console.log(error)
    }

}
async function sendPassResetEmail({ email, userId }: VerifyI) {
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

export {sendActivationEmail, sendPassResetEmail, encryptAES, decryptAES}
