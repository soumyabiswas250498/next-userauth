import React from 'react'
import { signOut } from 'next-auth/react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function ProfileMenu(props: any) {
  const router = useRouter();

    
  return (
    <HoverCard openDelay={10} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div className='border border-primary rounded-full h-[36px] w-[36px] p-[3px]'>
            <Image src={'/avatar.png'} alt='avatar' width={30} height={30} className='object-contain h-full w-full' />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className={"w-fit"}>
        <div className="w-full flex flex-col gap-1 select-none text-sm">
            <p className="cursor-pointer hover:bg-primary hover:text-primary-foreground px-2 rounded transition duration-300 ease-in-out" onClick={()=>{router.push('/user/profile')}} >Profile</p>
            <p className="cursor-pointer hover:bg-primary hover:text-primary-foreground px-2 rounded transition duration-300 ease-in-out">Marked Questions</p>
            <p className="cursor-pointer hover:bg-primary hover:text-primary-foreground px-2 rounded transition duration-300 ease-in-out" onClick={()=>signOut()}>Logout</p>
            
        </div>
        
      </HoverCardContent>
    </HoverCard>
  )
}
