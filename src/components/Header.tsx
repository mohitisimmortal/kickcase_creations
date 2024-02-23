import React from 'react';
import { MdAccountCircle, MdShoppingBasket } from "react-icons/md";
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userState } from '@/state/userState'; // Importing the userState atom

const Header = () => {
  const { isLoggedIn } = useRecoilValue(userState);

  return (
    <div className='flex justify-between items-center bg-black fixed w-screen pt-4 pb-4 md:pt-3 z-50 pl-5 pr-5 md:pl-6 md:pr-6'>
      <Link href={'/'} className="text-white sm:text-lg xl:text-xl">Kickcase</Link>
      {isLoggedIn ? (
         <Link href={'/myorders'}>
         <MdShoppingBasket size={24} className="text-white" />
     </Link>
      ) : (
        <Link href={'/login'} className="text-white border pl-2 pr-2 text-xs rounded-xl p-[.15rem] sm:text-sm xl:pl-3 xl:pr-3 xl xl:rounded-full">Login</Link>
      )}
      
    </div>
  );
};

export default Header;