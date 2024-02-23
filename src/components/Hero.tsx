import { nunito } from '@/fonts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
    return (
        <div className={`${nunito.className} bg-black min-h-screen pt-20 sm:pb-4 text-white pl-5 pr-5 md:pl-6 md:pr-6 lg:pt-14`}>

            <h1 className=' text-6xl md:text-7xl xs:text-center' style={{ letterSpacing: '.1rem' }}>
                Sneaker
            </h1>
            <h1 className=' text-right xs:text-center text-6xl md:text-7xl mb-5 lg:mb-2' style={{ letterSpacing: '.1rem' }}>
                Forever
            </h1>
            <div className='lg:flex justify-between items-center'>
                <div className="lg:w-1/4 hidden lg:block text-neutral-600">
                    <p className=" text-left">
                        Discover the ultimate comfort and style
                    </p>
                    <p className=" text-left">
                        tailored for the sneaker enthusiasts
                    </p>
                </div>
                <div className='mb-5'>
                    <Image src={'/hero1.jpeg'} width={400} height={300} alt='sneaker image' className=' text-center mx-auto h-96 lg:h-full object-cover rounded-md lg:' priority />
                </div>
                <div className="lg:w-1/4 hidden lg:block text-neutral-600">
                    <p className=" text-right">
                        Step into the future of footwear
                    </p>
                    <p className="text-right ">
                        where innovation meets design
                    </p>
                </div>
            </div>
            <Link href={'/productpage'} className='text-lg border text-white py-1 px-4 rounded-full hover:bg-white hover:text-black transition duration-300 xs:mx-auto xs:text-center xs:block xs:w-36'>
                Buy Now -{`>`}
            </Link>
        </div>
    )
}

export default Hero;
