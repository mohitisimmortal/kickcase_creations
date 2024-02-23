import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { userState } from '@/state/userState';
import { useRecoilValue } from 'recoil';
import { handleApiError } from '@/utils/reactToastify';
import baseUrl from '@/baseUrl';

const AddressForm = () => {
    const router = useRouter();
    const { user } = useRecoilValue(userState);
    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const dimension = localStorage.getItem('dimension');
        const shoeSize = localStorage.getItem('shoeSize');
        const drawers = localStorage.getItem('drawers');
        const totalCost = localStorage.getItem('totalCost');

        if (!dimension || !shoeSize || !drawers || !totalCost) {
            router.push('/productpage');
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        try {
            const addressInfo = { fullName, mobile, address, city, state };
            const orderData = {
                userId: user?.userId,
                dimension: localStorage.getItem('dimension') || '',
                shoeSize: localStorage.getItem('shoeSize') || '',
                totalCost: parseInt(localStorage.getItem('totalCost') || '0'),
                drawers: JSON.parse(localStorage.getItem('drawers') || '[]'),
                addressInfo,
            };
            await axios.post(`${baseUrl}/orders`, orderData);

            localStorage.removeItem('dimension');
            localStorage.removeItem('shoeSize');
            localStorage.removeItem('drawers');
            localStorage.removeItem('totalCost');
            router.push('/myorders');
        } catch (error) {
            handleApiError(error)
            // console.error('Error creating order:', error);
        }
        finally { setLoading(false) }
    };

    return (
        <div className="pb-5 pl-5 pr-5 md:pl-6 md:pr-6 pt-20">
            <p className="text-sm text-gray-500 mb-5">We currently serve to Delhi and Delhi-NCR region only.</p>
            <form onSubmit={handleSubmit}>
                {/* Full Name Input */}
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                    <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                {/* Mobile Number Input */}
                <div className="mb-4">
                    <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
                    <input
                        id="mobile"
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                {/* Address Input */}
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                    <textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                {/* City Input */}
                <div className="mb-4">
                    <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">City</label>
                    <input
                        required
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* State Selection */}
                <div className="mb-6">
                    <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">State</label>
                    <select
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select State</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Rajasthan">Rajasthan</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={loading} // Disable the button when loading is true
                >
                    {loading ? 'Loading...' : 'Pay on Delivery'}
                </button>
            </form>
        </div>
    );
};

export default AddressForm;