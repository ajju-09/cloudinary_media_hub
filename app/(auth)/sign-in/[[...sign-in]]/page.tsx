'use client'
import { SignIn, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

export default function Page() {

  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(isSignedIn){
      router.push('/home')
    }
  }, [isSignedIn, router])

  return(
    <div className='flex justify-center items-center min-h-screen'>
    <SignIn  />
  </div>
  )
  
}