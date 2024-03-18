import React, { useEffect, useRef, useState } from 'react'
import { otpLength } from '@/src/__server__/utils/constants'

interface propsI {
    onOtpSubmit: any
}

function OtpInput(props: propsI) {
    const { onOtpSubmit } = props;
    const [otp, setOtp] = useState(new Array(otpLength).fill(''));
    const inputRefs: any = useRef([])
    const handleChange = (index: number, e: any) => {
        console.log();
        const value = e.target.value;

        const newOtp = [...otp];

        // allow only one input
        newOtp[index] = value.substring(value.length - 1)
        setOtp(newOtp)
        const combinedOtp = newOtp.join('');

        // trigger submit
        if (combinedOtp.length === otpLength) {
            onOtpSubmit(combinedOtp)
        }

        // move focus to the next field
        if (value && index < otpLength - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }



    }

    const handleClick = (index: number) => {
        inputRefs.current[index].setSelectionRange(1, 1);
        const firstEmpty = otp.indexOf('');
        console.log(firstEmpty)
        if (firstEmpty !== -1) {
            inputRefs.current[firstEmpty].focus()
        }
    }

    const handleKeyDown = (index: number, e: any) => {

        // moving focus to previous field on backspace
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus()
        }
    }

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [])
    // console.log(inputRefs)



    return (
        <div className='flex justify-center items-center gap-2'>
            {
                otp.map((value, index) => {
                    return <input
                        ref={(input) => (inputRefs.current[index] = input)}
                        key={index}
                        type='text'
                        className='w-10 h-10 px-[14px] flex justify-center items-center rounded'
                        value={value}
                        onChange={(e: any) => handleChange(index, e)}
                        onClick={() => handleClick(index)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                })
            }
        </div>
    )
}

export default OtpInput