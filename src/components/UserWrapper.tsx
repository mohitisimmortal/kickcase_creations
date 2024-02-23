import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '@/state/userState';
import baseUrl from '@/baseUrl';
import Loader from './Loader';

interface UserWrapperProps {
    children: React.ReactNode;
}

const UserWrapper: React.FC<UserWrapperProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [, setUser] = useRecoilState(userState);

    useEffect(() => {
        const rehydrateUser = async () => {
            try {
                // Fetch user data using the token
                const response = await axios.get(`${baseUrl}/user`);
                const userData = response.data.user;
                setUser({ isLoggedIn: true, user: userData });
                setIsLoading(false);
            } catch (error) {
                // console.error('Error rehydrating user:', error);
                setIsLoading(false);
            }
        };

        rehydrateUser();
    }, []);

    return isLoading ? <Loader/> : <>{children}</>;
};

export default UserWrapper;
