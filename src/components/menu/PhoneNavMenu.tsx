import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';


export function PhoneMenu(props: any) {
    const { data, status, fullname } = props;
    const router = useRouter();

    const Section = (props: any) => {
        const { item } = props;
        return <div className="flex flex-col">
            <h2 className="border-b-2 border-primary text-primary my-1 cursor-default">{item.label}</h2>
            {
                item.menu.map((item: any, index: number) => <p className="cursor-pointer hover:bg-primary hover:text-primary-foreground my-1 rounded transition duration-300 ease-in-out" key={index}>{item.label}</p>)
            }

        </div>

    }
    return (
        <Accordion type="single" collapsible className="w-full">
            {status === 'authenticated' && <AccordionItem value="item-0">
                <AccordionTrigger className=" w-full flex gap-2">
                    <div className='border border-primary rounded-full h-[20px] w-[20px] p-[3px]'>
                        <Image src={'/avatar.png'} alt='avatar' width={20} height={20} className='object-contain h-full w-full' />
                    </div>
                    <div className="w-full flex justify-start">
                        <p>{fullname}</p>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="w-full flex flex-col justify-between select-none">
                        <p className="cursor-pointer hover:bg-primary hover:text-primary-foreground my-1 rounded transition duration-300 ease-in-out" onClick={()=>{router.push('/user/profile')}} >Profile</p>
                        <p className="cursor-pointer hover:bg-primary hover:text-primary-foreground my-1 rounded transition duration-300 ease-in-out" >Marked Questions</p>
                        <p className="cursor-pointer hover:bg-primary hover:text-primary-foreground my-1 rounded transition duration-300 ease-in-out" onClick={()=>{signOut()}} >Logout</p>
                    </div>
                </AccordionContent>
            </AccordionItem>}

            <AccordionItem value="item-1">
                <AccordionTrigger>Exams</AccordionTrigger>
                <AccordionContent>
                    <div className="w-full flex flex-col justify-between select-none">
                        {data.section.map((item: any, index: number) => <Section key={index} item={item} />)}
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Subjects</AccordionTrigger>
                <AccordionContent>
                    <div className="w-full flex flex-col justify-between select-none">
                        {data.subject.map((item: any, index: number) => <Section key={index} item={item} />)}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}