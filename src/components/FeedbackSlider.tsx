import React from 'react';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

const feedbacks = [
        {
            "quote": "The attention to detail on these drawers is unmatched. They're the perfect addition to my sneaker room.",
            "author": "Ananya"
        },
        {
            "quote": "I can't believe how much easier it is to find my favorite pairs now that I have these custom drawers. Worth every penny!",
            "author": "Ishaan"
        },
        {
            "quote": "I'm blown away by the quality and craftsmanship of these drawers. They're a must-have for any serious sneaker collector.",
            "author": "Yashika"
        },
        {
            "quote": "Finally, a storage solution that's as stylish as my sneaker collection! These drawers are a game-changer.",
            "author": "Zara"
        }
];

const FeedbackSlider: React.FC = () => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current: container } = scrollRef;
            const scrollAmount = container.scrollWidth / feedbacks.length;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <section className=' bg-black text-white w-full p-20 overflow-hidden  pl-5 pr-5 md:pl-6 md:pr-6'>

                <div className="max-w-2xl mx-auto text-center lg:mb-5">
                    <h2 className="text-3xl font-bold">What Our Clients</h2>
                    <h2 className="text-3xl font-bold">Are Saying</h2>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <FaChevronLeft onClick={() => scroll('left')} className="cursor-pointer" />
                    <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth w-full hide-scrollbar">
                        {feedbacks.map((feedback, index) => (
                            <div key={index} className="flex-shrink-0 w-full flex justify-center snap-center">
                                <div className="text-center space-y-4 p-4">
                                    <div className="text-yellow-400 flex items-center justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} />
                                        ))}
                                    </div>
                                    <blockquote className="text-lg font-medium">"{feedback.quote}"</blockquote>
                                    <cite className="text-sm not-italic">-- {feedback.author}</cite>
                                </div>
                            </div>
                        ))}
                    </div>
                    <FaChevronRight onClick={() => scroll('right')} className="cursor-pointer" />
                    <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
                -ms-overflow-style: none;  
                scrollbar-width: none;  
            }
            `}</style>
                </div>
            </section>
        </>
    );
};

export default FeedbackSlider;
