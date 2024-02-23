import { userState } from '@/state/userState';
import { showSuccessNotification } from '@/utils/reactToastify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';

interface Drawer {
    number: number;
    color: string | undefined;
    brandLogo: string | undefined;
}

const ProductPage = () => {
    const drawerPrices = [4000, 6500, 8500, 10500, 12500, 14500, 16500];
    const maxDrawers = 7;
    const router = useRouter()
    const { isLoggedIn } = useRecoilValue(userState);

    useEffect(() => {
        // Redirect to /signup if not logged in
        if (!isLoggedIn) {
            router.push('/signup');
        }
    }, [isLoggedIn, router]);

    const [drawers, setDrawers] = useState<Drawer[]>(() => {
        const savedDrawers = localStorage.getItem('drawers');
        return savedDrawers ? JSON.parse(savedDrawers) : [];
    });

    const [dimension, setDimension] = useState<string>(() => {
        const savedDimension = localStorage.getItem('dimension');
        return savedDimension || 'Width: 16 inch, Depth: 12 inch, Height: 7 inch';
    });

    const [shoeSize, setShoeSize] = useState<string>(() => {
        const SavedShoeSize = localStorage.getItem('shoeSize');
        return SavedShoeSize || '';
    });

    const [color, setColor] = useState<string>('');
    const [brandLogo, setBrandLogo] = useState<string>('');

    useEffect(() => {
        const savedDrawers = JSON.parse(localStorage.getItem('drawers') || '[]') as Drawer[];
        const savedDimension = localStorage.getItem('dimension') || '';
        const savedShoeSize = localStorage.getItem('shoeSize') || '';
        setDrawers(savedDrawers);
        setDimension(savedDimension);
        setShoeSize(savedShoeSize);
    }, []);

    useEffect(() => {
        localStorage.setItem('drawers', JSON.stringify(drawers));
    }, [drawers]);

    useEffect(() => {
        localStorage.setItem('dimension', dimension);
    }, [dimension]);

    useEffect(() => {
        localStorage.setItem('shoeSize', shoeSize);
    }, [shoeSize]);

    const handleAddDrawer = () => {
        if (drawers.length >= maxDrawers) {
            showSuccessNotification('Maximum 7 drawers can be selected.');
            return;
        }

        const newDrawerNumber = drawers.length + 1;
        const newDrawer = { number: newDrawerNumber, color, brandLogo };
        setDrawers(prevDrawers => [
            newDrawer,
            ...prevDrawers
        ]);
        setColor('');
        setBrandLogo('');
    };

    const handleEditDrawer = (number: number, property: keyof Drawer, value: string) => {
        setDrawers(prevDrawers =>
            prevDrawers.map(drawer =>
                drawer.number === number ? { ...drawer, [property]: value } : drawer
            )
        );
    };

    const handleRemoveDrawer = (numberToRemove: number) => {
        setDrawers(prevDrawers =>
            prevDrawers.filter(drawer => drawer.number !== numberToRemove)
                .map((drawer, index, array) => ({ ...drawer, number: array.length - index }))
        );
    };

    const getTotalCost = () => {
        const numDrawers = drawers.length;
        if (numDrawers > 0 && numDrawers <= drawerPrices.length) {
            return drawerPrices[numDrawers - 1];
        }
        return 0;
    };
    
    // After calculating the total cost
    const totalCost = getTotalCost();
    localStorage.setItem('totalCost', totalCost.toString());


    const atLeastOneDrawerSelected = drawers.length > 0;
    const allInputsFilled = dimension && shoeSize && drawers.every(drawer => drawer.color && drawer.brandLogo);

    return (
        <div className={`pt-20 pl-5 pr-5 md:pl-6 md:pr-6 ${drawers.length > 1 ? 'pb-1' : 'pb-60'}`}>
            <h1 className="text-3xl font-bold mb-4 text-white">Personalized Drawers</h1>
            <p className="mb-4 text-neutral-600">Please provide dimensions and shoe size for a perfect fit drawer.</p>
            <p className="mb-4 text-neutral-600">Pre-filled dimensions are best-suited for most sneakerheads.</p>
            <div className="mb-4">
                <input
                    type="text"
                    className="border rounded mb-2 px-4 py-2 mr-2"
                    placeholder="Dimension"
                    value={dimension}
                    onChange={e => setDimension(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="border rounded px-4 py-2"
                    placeholder="Shoe Size"
                    value={shoeSize}
                    onChange={e => setShoeSize(e.target.value)}
                    required
                />
            </div>
            <button className="bg-white font-semibold px-4 py-2 rounded mt-4 mr-2" onClick={handleAddDrawer}>Add a Drawer</button>
            <Link href={atLeastOneDrawerSelected && allInputsFilled ? '/address' : '#!'} className={`bg-green-400 font-semibold px-4 py-2 rounded mt-2 ${(!atLeastOneDrawerSelected || !allInputsFilled) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                Proceed to Buy
            </Link>
            <p className=' font-medium mb-2 mt-2 text-neutral-600'>Total cost - ₹{getTotalCost()}/-</p>
            {drawers.map(drawer => (
                <div key={drawer.number} className="border p-4 mb-4 flex items-center justify-between flex-col md:flex-row">
                    <div>
                        <h2 className="text-lg font-bold mb-2 text-white">Drawer {drawer.number}</h2>
                    </div>
                    <div className='flex flex-col md:block'>
                        <input
                            required
                            type="text"
                            className="border rounded px-4 py-2 mb-2 md:mr-2"
                            placeholder="Color"
                            value={drawer.color || ''}
                            onChange={e => handleEditDrawer(drawer.number, 'color', e.target.value)}
                        />
                        <input
                            required
                            type="text"
                            className="border rounded px-4 py-2 mb-2"
                            placeholder="Brand Logo"
                            value={drawer.brandLogo || ''}
                            onChange={e => handleEditDrawer(drawer.number, 'brandLogo', e.target.value)}
                        />
                    </div>
                    <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleRemoveDrawer(drawer.number)}>
                        <FaTrash />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductPage;