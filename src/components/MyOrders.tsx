import { userState } from '@/state/userState';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { handleApiError } from '@/utils/reactToastify';
import baseUrl from '@/baseUrl';
import Loader from './Loader';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [{ isLoggedIn, user }, setUser] = useRecoilState(userState);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true)
            try {
                if (!user || !isLoggedIn) return;
                const response = await axios.get(`${baseUrl}/myorders?userId=${user.userId}`);
                setOrders(response.data);
            } catch (error) {
                handleApiError(error)
            } finally { setLoading(false) }
        };

        fetchOrders();
    }, []);

    const handleLogout = () => {
        // Clear user state and redirect to login page
        setUser({ isLoggedIn: false, user: null });
        // Task- make a api to remove cookie
        document.cookie = 'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Strict;';
        router.push('/login');
    };

    return (
        <div className={`pl-5 pr-5 md:pl-6 md:pr-6 pt-20 ${orders.length <= 1 ? 'pb-60' : 'pb-0'}`}>
            <h1 className="text-3xl font-bold mb-8 text-white">My Orders</h1>
            {loading && <Loader />} {/* Show the loader while loading */}

            {orders.length === 0 && (
                <div className="mb-8">
                    <p className="text-gray-600 mb-2">You have no orders yet.</p>
                    <button
                        onClick={() => router.push('/productpage')}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Buy a personalized drawer
                    </button>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order: any) => (
                    <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Order ID: {order.id}</h2>
                        <p className="text-gray-600 mb-2">Dimension: {order.dimension}</p>
                        <p className="text-gray-600 mb-2">Shoe Size: {order.shoeSize}</p>
                        <p className="text-gray-600 mb-2">Total Cost: {order.totalCost}</p>
                        <p className="text-gray-600 mb-4">Address: {order.addressInfo[0].address},{order.addressInfo[0].city},{order.addressInfo[0].state}</p>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">Drawers:</h3>
                            {order.drawers.map((drawer: any) => (
                                <div key={drawer.id} className="flex mb-2">
                                    <div>
                                        <p className="text-gray-600">
                                            Number: {drawer.number}, Color: {drawer.color}, Brand Logo: {drawer.brandLogo}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={handleLogout}
                className="mt-8 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mb-10"
            >
                Logout
            </button>
        </div>
    );
};

export default MyOrders;
