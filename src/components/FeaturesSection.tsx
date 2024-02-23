import React from 'react';
import { FaRegGem, FaRocket, FaUsers, FaClock } from 'react-icons/fa';

const FeaturesSection = () => {
    const features = [
        {
            icon: <FaUsers />,
            title: 'Client-Centric Approach',
            description: 'With a client-focused approach, we deliver solutions that align with your goals and vision.'
        },
        {
            icon: <FaRegGem />,
            title: 'Creative Excellence',
            description: 'We take pride in being a team of creative minds that consistently delivers extraordinary and captivating work.'
        },
        {
            icon: <FaRocket />,
            title: 'Strategic Thinking',
            description: 'By combining creative thinking with strategic analysis, we ensure that every step we take is in line with your.'
        },
        {
            icon: <FaClock />,
            title: 'Timely Delivery',
            description: 'We value your time. With a commitment to timely execution, we always deliver projects on schedule.'
        }
    ];

    return (
        <div className="bg-white text-black pl-5 pr-5 md:pl-6 md:pr-6 py-14">
            <div className="max-w-2xl mx-auto text-center lg:mb-5">
                <h2 className="text-3xl font-bold">Passionate Creators,</h2>
                <h2 className="text-3xl font-bold mb-3">Innovators and Visionaries</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {features.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-4 border border-black">
                        <div className="text-3xl mb-4">{feature.icon}</div>
                        <h3 className="font-bold mb-2">{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturesSection;