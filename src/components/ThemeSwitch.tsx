// app/components/ThemeSwitch.tsx
'use client'

import { FiSun, FiMoon } from "react-icons/fi"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from "next/image"

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return (
    <div>
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={20}
        height={20}
        sizes="36x36"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
      />
    </div>

  )

  if (resolvedTheme === 'dark') {
    return <div className="cursor-pointer h-6 w-6 flex justify-center items-center border border-primary rounded-md" onClick={(e) =>{ e.stopPropagation(); setTheme('light')}}>
      <FiSun  />
    </div>
  }

  if (resolvedTheme === 'light') {
    return <div className="cursor-pointer h-6 w-6 flex justify-center items-center border border-primary rounded-md" onClick={(e) =>{e.stopPropagation(); setTheme('dark')}}>
      <FiMoon  />
    </div>
  }

}