import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


function LinkedMenu(props: any) {
    const { data, label1, label2, name1, name2, setFieldValue, handleBlur, touched, errors } = props;
    const [menu1Value, setMenu1Value] = useState('');
    const [menu2Data, setMenu2Data]: any = useState();
    const menu1Data = Object.keys(data);
    useEffect(() => {
        setMenu2Data(data[menu1Value])
    }, [menu1Value])

    return (
        <div className='flex gap-2'>
            <div>
                <p>{label1}</p>
                <Select onValueChange={(e) => { setMenu1Value(e); setFieldValue(name1, e) }}>
                    <SelectTrigger name={name1} className="w-[180px]" onBlur={handleBlur}>
                        <SelectValue placeholder={label1} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {menu1Data.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {touched[name1] && errors[name1] ? <p className='text-red-500 text-sm '>{errors[name1]}</p> : <p className='text-red-500 text-sm '>&nbsp;</p>}
            </div>



            {
                menu2Data &&
                <div>
                    <p>{label2}</p>
                    <Select onValueChange={(e) => { setFieldValue(name2, e) }}>
                        <SelectTrigger name={name2} onBlur={handleBlur} className="w-[180px]">
                            <SelectValue placeholder={label2} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {menu2Data?.map((item: any) => <SelectItem key={item.topic || item.exam} value={item.topic || item.exam}>{item.topic || item.exam}</SelectItem>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {touched[name2] && errors[name2] ? <p className='text-red-500 text-sm '>{errors[name2]}</p> : <p className='text-red-500 text-sm '>&nbsp;</p>}
                </div>

            }
        </div >
    )
}

export default LinkedMenu