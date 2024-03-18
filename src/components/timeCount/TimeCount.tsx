import React, { useEffect, useState } from 'react';


interface TimeCount {
    size: number;
    progress: number;
    total: number;
}


export const TimeCount: React.FC<TimeCount> = ({ size, progress, total }) => {
    const [offset, setOffset] = useState(0);
    const circleRadius = size / 2 - 5;
    const circumference = 2 * Math.PI * circleRadius;

    useEffect(() => {
        const progressOffset = ((total - progress) / total) * circumference;
        setOffset(progressOffset);
    }, [progress, circumference]);

    return (
        <div className='relative'>
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

            <p className='absolute h-full w-full top-0 left-0 flex justify-center items-center text-sm'>{progress} Sec</p>
        </div>

    );
};