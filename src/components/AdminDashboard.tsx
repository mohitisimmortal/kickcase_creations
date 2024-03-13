import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { handleApiError } from '@/utils/reactToastify';
import baseUrl from '@/baseUrl';
import Loader from './Loader';

interface Drawer {
    number: number;
    color: string;
    brandLogo: string;
}

interface Address {
    id: number;
    fullName: string;
    mobile: string;
    address: string;
    city: string;
    state: string;
}

interface Order {
    id: number;
    dimension: string;
    shoeSize: string;
    totalCost: number;
    drawers: Drawer[];
    address: Address[];
    delivered: boolean;
}

const initialOrders: Order[] = []; // Adjust according to actual API response structure

const AdminDashboard = () => {
    const [password, setPassword] = useState('');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(0); // Track the starting index of orders to fetch

    const fetchOrders = async (startIndex: number) => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseUrl}/orders?start=${startIndex}&limit=5`);
            setOrders(prevOrders => [...prevOrders, ...response.data]);
            setStart(prevStart => prevStart + response.data.length);

        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    };

    // In development mode,put react strict mode to false to eliminate 2 same api calls problem
    useEffect(() => {
        let isMounted = true
        // Check for admin's authenticated state in localStorage
        const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
        const authTime = localStorage.getItem('authTime');
        const weekInMillis = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds

        const shouldFetchOrders = isAuthenticated && authTime && (new Date().getTime() - parseInt(authTime) < weekInMillis);

        if (!isPasswordCorrect && shouldFetchOrders && !loading) {
            setIsPasswordCorrect(true);
            fetchOrders(start);
        }
        // Cleanup function to cancel ongoing fetch operation
        return () => {
            isMounted = false;
        };
    }, []);


    const handleViewMore = () => {
        fetchOrders(start);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Here, replace with your actual password check
            const response = await axios.post(`${baseUrl}/auth/password`, { password });
            if (response.status === 200) {
                setIsPasswordCorrect(true);
                localStorage.setItem('isAdminAuthenticated', 'true');
                localStorage.setItem('authTime', new Date().getTime().toString());

                // Fetch orders when password is correct
                fetchOrders(start)
            }
        } catch (error) {
            handleApiError(error)
            // console.error('Error:', error);
        }
    };

    const handleDelivered = async (orderId: number) => {
        try {
            await axios.put(`${baseUrl}/orders/${orderId}/delivered`);
            const updatedOrders = orders.map((order) => {
                if (order.id === orderId) {
                    return { ...order, delivered: true };
                }
                return order;
            });
            setOrders(updatedOrders);
        } catch (error) {
            handleApiError(error)
            // console.error('Error marking order as delivered:', error);
        }
    };

    if (!isPasswordCorrect) {
        return (
            <div className="container mx-auto pl-5 pr-5 md:pl-6 md:pr-6 pt-20 h-screen">
                <h1 className="text-3xl font-bold mb-4 text-white">Admin Dashboard</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="password" className="block mb-2 text-white">Enter Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded-md p-2 mb-4 mr-2" />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
                </form>
            </div>
        );
    }


    return (
        <div className="pl-5 pr-5 md:pl-6 md:pr-6 pt-20 bg-white pb-20">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            {loading ? <Loader /> :
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {orders.map((order) => (
                        <div key={order.id} className="border border-gray-500 p-4 rounded-md">
                            <h2 className="text-lg font-semibold mb-2">Order ID: {order.id}</h2>
                            <p className="text-gray-600 mb-2">Dimension: {order.dimension}</p>
                            <p className="text-gray-600 mb-2">Shoe Size: {order.shoeSize}</p>
                            <p className="text-gray-600 mb-2">Total Cost: {order.totalCost}</p>
                            {/* Access the first address in the array and provide fallbacks if undefined */}
                            <p className="text-gray-600 mb-2">Full Name: {order.address[0]?.fullName || 'N/A'}</p>
                            <p className="text-gray-600 mb-2">Phone Number: {order.address[0]?.mobile || 'N/A'}</p>
                            <p className="text-gray-600 mb-2">Address: {`${order.address[0]?.address}, ${order.address[0]?.city}, ${order.address[0]?.state}` || 'N/A'}</p>
                            <label>
                                <input type="checkbox" checked={order.delivered} onChange={() => handleDelivered(order.id)} disabled={order.delivered} /> Delivered
                            </label>
                            {/* Iterate over drawers */}
                            {order.drawers.map((drawer, index) => (
                                <div key={index}>
                                    <p>Drawer {drawer.number}: {drawer.color} - {drawer.brandLogo}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            }
            <button
                onClick={handleViewMore}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                disabled={loading}
            >
                {loading ? <Loader /> : 'View More'}
            </button>
        </div>
    );
};

export default AdminDashboard;