import React from 'react'
import ThemeSwitch from '@/src/ThemeSwitch'
function page() {
  return (
    <div className='m-2'>
        <ThemeSwitch />
        <div className='w-48 h-16 bg-slate-400 dark:bg-slate-900'>
            <p>Hello</p>

        </div>
    </div>
  )
}

export default page