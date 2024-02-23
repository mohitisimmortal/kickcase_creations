import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const StepByStepGuide = () => {
    return (
        <div className="bg-white  pl-5 pr-5 md:pl-6 md:pr-6 py-10">
            <div className="text-center mb-8">
                <h2 className="text-4xl mb-2 font-bold lg:text-5xl">How it works:</h2>
                <p className=" ">Create, Customize, Conclude</p>
            </div>
            <div className="flex flex-col justify-center items-center md:gap-3">
                <div className="mb-6 md:mb-0 md:w-2/3 lg:w-1/2">
                    <div className="flex flex-col">
                        <p className="font-bold p-2 pt-0 pb-0 rounded-full border bg-black text-white w-fit">1</p>
                        <p className='mb-2'>Visit the Product Page to get started. Fill in the dimensions and shoe size for the perfect fit sneaker drawers.</p>
                        <div className=" w-full h-40 xs:h-60  relative mb-2">
                            <Image
                                src="/step1.png"
                                alt="Step 1"
                                layout="fill"
                                className=' object-contain'
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-6 md:mb-0 md:w-2/3 lg:w-1/2">
                    <div className="flex flex-col ">
                        <p className="font-bold rounded-full border bg-black text-white w-fit p-2 pt-0 pb-0">2</p>
                        <p className='mb-2'>Add a drawer: Choose the color and brand logo. You can personalize your request with any specific details, links, or suggestions.</p>
                        <div className=" w-full h-40 xs:h-60 relative mb-2">
                            <Image
                                src="/step2.2.png"
                                alt="Step 1"
                                layout="fill"
                                className=' object-contain'
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-6 md:mb-0 md:w-2/3 lg:w-1/2">
                    <div className="flex flex-col ">
                        <p className="font-bold rounded-full border bg-black text-white w-fit p-2 pt-0 pb-0">3</p>
                        <p className='mb-2'>Finalize your order by providing your address details. Once completed, you're all set to go!</p>
                        <div className=" w-full h-40 xs:h-60  relative mb-2">
                            <Image
                                src="/step3.4.png"
                                alt="Step 1"
                                layout="fill"
                                className='object-contain'
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Link href={'/productpage'} className=" border border-black py-2 px-2 hover:bg-black hover:text-white transition -mt-10">
                        ORDER NOW →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StepByStepGuide;