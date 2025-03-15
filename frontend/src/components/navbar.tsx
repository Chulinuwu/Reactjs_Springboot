"use client";

import Link from 'next/link';
import Image from 'next/image';
import { LogOut } from 'lucide-react';
import { LogoutUser } from '@/actions/user/logout';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface NavbarProps {
    balance: number;
    isAdmin: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ balance, isAdmin }) => {
    const router = useRouter();

  async function onLogout() {
    try {
      await LogoutUser();
      toast.success('Logged out successfully!');
      router.push('/register');
    } catch (error: any) {
      console.error('Logout failed:', error);
        toast.error('Logout failed!');
    }
  }

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-sky-900 text-white p-4 h-20'>
      <div className='container mx-auto flex items-center justify-between'>
        {/* Logo */}
        <Link href='/'>
          <div className='flex items-center'>
            <Image
              src='/img/logo.png'
              alt='Logo'
              width={50}
              height={50}
              className='rounded-full'
            />
          </div>
        </Link>

        {/* Login button and Balance */}
        <div className='flex items-center gap-6'>
            <>
                {!isAdmin && (
                    <div className='flex items-center space-x-2'>
                        <span className='hidden sm:inline text-sm'>Balance:</span>
                        <div className='flex h-auto w-auto rounded text-white font-semibold bg-green-500 p-2'>${balance}</div>
                    </div>
                )}
              <button
                type='button'
                onClick={onLogout}
                className='cursor-pointer mr-2'
                >
                    <LogOut size={30} />
                </button>
            </>
        </div>
      </div>
    </nav>
  );
}