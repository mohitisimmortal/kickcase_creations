import React, { useState, useRef, useEffect } from 'react';

const showcaseItems = [
    { src: '/m1.mp4', text: 'Innovation in Every Step' },
    { src: '/m4.mp4', text: 'Design Meets Functionality' },
    { src: '/m6.mp4', text: 'Crafted for Performance' },
    // Add more items as needed
];

const ProductShowcase = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null); // Specify the type explicitly

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? showcaseItems.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === showcaseItems.length - 1 ? 0 : prevIndex + 1));
    };

    const togglePlay = () => {
        if (videoRef.current) {
            const videoElement = videoRef.current as HTMLVideoElement; // Cast to HTMLVideoElement
            if (isPlaying) {
                videoElement.pause(); // Call pause() on the video element
            } else {
                videoElement.play(); // Call play() on the video element
            }
            setIsPlaying((prevIsPlaying) => !prevIsPlaying);
        }
    };

    return (
        <div className="mx-6 mt-10 mb-10 h-[29.9rem] relative rounded-xl lg:h-[34.3rem]" style={{ background: '#181818' }}>
            <h1 className="text-2xl md:text-3xl text-white font-bold p-4 text-center pt-10 lg:pt-5">Moments Captured</h1>
            <div className="flex flex-col lg:flex-row items-center justify-center">
                <div className="lg:w-1/3">
                    <p className="text-white lg:text-xl text-center lg:text-left">{showcaseItems[currentIndex].text}</p>
                </div>
                <div className="relative flex justify-center items-center">
                    <video
                        ref={videoRef}
                        src={showcaseItems[currentIndex].src}
                        loop
                        className="mt-4 h-80 w-60 lg:w-96 lg:h-96 px-4 object-cover cursor-pointer"
                        onClick={togglePlay}
                    />
                </div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 lg:translate-x-40 flex ">
                <button onClick={handlePrev} className="p-2 m-2 rounded-full bg-white text-gray-700 shadow-lg">
                    &lt;
                </button>
                <button onClick={handleNext} className="p-2 m-2 rounded-full bg-white text-gray-700 shadow-lg">
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default ProductShowcase;