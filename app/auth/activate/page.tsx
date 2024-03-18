"use client"
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import useAuthHook from '@/src/hooks/useAuthHook';

function Activate() {
  const searchParams = useSearchParams();

  const { verifyRequest } = useAuthHook()

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // verifyRequest(token)
    }
  }, [])

  return (
    <div>Activate</div>
  )
}

export default Activate