"use client"

import * as React from "react"
import ThemeSwitch from "../ThemeSwitch";
import { HoverMenu } from "../menu/HoverMenu";
import { Button } from "@/components/ui/button";
import { ProfileMenu } from "../menu/ProfileMenu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useFirstEvent from "@/src/hooks/useFirstEvent";



const menus = {
  subject: [
    { label: "Social Science", menu: [{ value: 'hist', label: 'History' }, { value: 'geog', label: 'Geography' }, { value: 'polity', label: 'Polity' }] },
    { label: "Science", menu: [{ value: 'physics', label: 'Physics' }, { value: 'chem', label: 'Chemistry' }, { value: 'bio', label: 'Biology' }] },
    { label: 'Others', menu: [{ value: 'gs', label: 'General Studies' }, { value: 'cdp', label: 'Child Development' }] }
  ],


  section: [{ label: "SSC", menu: [{ value: 'chsl', label: 'CHSL' }, { value: 'mts', label: 'MTS' }, { value: 'cgl', label: 'CGL' }] },
  { label: "Rail", menu: [{ value: 'rail-d', label: 'RRC Group D' }, { value: 'rail-ntpc', label: 'RRB NTPC' }, { value: 'alp', label: 'RRB ALP' }] },
  { label: "WB Exams", menu: [{ value: 'tet', label: 'TET' }, { value: 'wbpsc', label: 'WBPSC' }] }
  ],
}



export function NavigationMenu() {
  const { status } = useSession();
  const router = useRouter();
  const { categoryApiCalls } = useFirstEvent()

  // useEffect(() => {
  //   categoryApiCalls();
  // }, [])

  return (
    <div className="h-full flex justify-end items-center w-1/2 gap-2 mr-2 large-nav-menu">
      <HoverMenu data={menus.section} menuLabel={'Sections'} contentStyle={'w-[350px]'} />
      <HoverMenu data={menus.subject} menuLabel={'Subjects'} contentStyle={'w-[420px]'} />
      <Button variant={'default'} onClick={() => { }}>
        Current Affairs
      </Button>
      {
        status !== 'authenticated' ?
          <Button variant={'default'} onClick={() => { router.push('/auth/login') }}>
            Login
          </Button>
          :
          <ProfileMenu data={menus.subject} menuLabel={'Subjects'} contentStyle={'w-[420px]'} />
      }
      <ThemeSwitch />
    </div>
  )
}


