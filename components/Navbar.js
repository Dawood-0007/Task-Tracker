import React from 'react'
import Link from 'next/link'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const Navbar = () => {
  return (
    <div className='flex justify-between bg-gray-400 p-4'>
      <h1 className='font-serif font-bold text-2xl'>Task Tracker</h1>
      <ul className='flex gap-10 items-center'>
        <Link href={"/"}><li className='cursor-pointer hover:underline'>Home</li></Link>
        <Link href={"/about"}><li className='cursor-pointer hover:underline'>About</li></Link>
        <Link href={"/tasks"}><li className='cursor-pointer hover:underline'>Tasks</li></Link>
        <SignedOut>
          <SignInButton >
            <li className='cursor-pointer hover:underline bg-black text-white p-2 rounded-2xl'>Sign In</li>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </ul>
    </div>
  )
}

export default Navbar