"use client"

import { GiHamburgerMenu } from "react-icons/gi";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import ThemeSwitch from "@/src/ThemeSwitch";
import { PhoneMenu } from "../menu/PhoneNavMenu";
import { Button } from "@/components/ui/button";

export function SheetDemo() {
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
  return (
    <Sheet >
      <SheetTrigger asChild className="mt-5 mr-2 phone-Nav-Menu">
        <GiHamburgerMenu className="text-3xl text-primary" />
      </SheetTrigger>
      <SheetContent>
        <div className="w-full flex flex-col justify-between h-full relative">

          <div className="relative pt-10">
          <div className="flex justify-between items-center mb-5">
              <Button variant={'outline'} className="w-28 border-primary">Current Affairs</Button>
              <Button variant={'outline'} className="w-28 border-primary"> Login </Button>
            </div>
            <PhoneMenu data={menus} />


          </div>
          <div className="flex flex-col gap-2">

            <div className="w-full flex justify-end ">
              <ThemeSwitch />
            </div>
          </div>


        </div>



        <SheetFooter>
          <SheetClose asChild>

          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
