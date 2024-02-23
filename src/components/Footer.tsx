import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className=' bg-white flex justify-between items-center pt-5 pb-5 pl-5 pr-5 md:pl-6 md:pr-6 '>
      <Link href={'/'} className="logo ">Kickcase</Link>
      <p className='text-sm'>2024|| All Rights Reserved.</p>
    </div>
  )
}

export default Footer