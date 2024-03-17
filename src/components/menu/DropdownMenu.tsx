"use client"

import * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Option {
  value: string;
  label: string;
}

interface PropsI {
  data: Option[];
  buttonStyle: string;
  menuStyle: string;
  menuLabel ?: string;
}

export function DropdownMenuRadioGroupDemo(props: PropsI) {
  const {data, buttonStyle, menuStyle, menuLabel} = props;
  const [value, setValue] = useState("")
  const [label, setLabel] = useState('Select')

  // const data = [{value: 'top', label: 'Top'},{value: 'bottom', label: 'Bottom'}, {value: 'left', label: 'Left'}, {value: 'right', label: 'Right'} ]

  const findLabel = (value:string)=>{
    const obj = data.find((item)=> item.value === value)
    return obj?.label || ''
  }

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button variant="default" className={buttonStyle || "w-24 truncate"}>{ menuLabel || label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={menuStyle || "w-32"}>
        {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuRadioGroup value={value} onValueChange={(e)=>{setValue(e); setLabel(findLabel(e))}}>
          {
            data.map((item, index)=><DropdownMenuRadioItem value={item.value} key={index}>{item.label}</DropdownMenuRadioItem> )
          }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
