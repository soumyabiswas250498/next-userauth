import React from 'react';
import Image from 'next/image';
import { NavigationMenu } from './NavigationMenu';


import { SheetDemo } from './NavigationMenuPhone';


const menus = {
    subject: [{ value: 'hist', label: 'History' }, { value: 'geog', label: 'Geography' }, { value: 'polity', label: 'Polity' }, { value: 'physics', label: 'Physics' }, { value: 'chem', label: 'Chemistry' }, { value: 'bio', label: 'Biology' }, { value: 'gs', label: 'General Studies' }, { value: 'cdp', label: 'Child Development' }],
    section: [{ value: 'chsl', label: 'CHSL' }, { value: 'mts', label: 'MTS' }, { value: 'cgl', label: 'CGL' }, { value: 'rail-d', label: 'RRC Group D' }, { value: 'rail-ntpc', label: 'RRB NTPC' }, { value: 'alp', label: 'RRB ALP' }, { value: 'tet', label: 'TET' }, { value: 'wbpsc', label: 'WBPSC' }],
}

function NavBar() {
    return (
        <div className='w-screen flex justify-between h-[75px]'>
            <div className='flex items-center h-[75px] p-2'>
                <Image src={'/logo.png'} alt='Logo' width={200} height={75} className='m-2' />
            </div>

            <NavigationMenu />



            <SheetDemo />
        </div>
    )
}

export default NavBar