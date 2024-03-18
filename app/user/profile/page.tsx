

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

 function ProfilePage() {
  return (
    <div>ProfilePage</div>
  )
}


export default ProfilePage