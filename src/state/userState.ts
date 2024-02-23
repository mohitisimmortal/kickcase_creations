// state/userState.ts

import { atom } from 'recoil';

interface User {
  isLoggedIn: boolean;
  user: {
    name: string;
    email: string;
    userId: number; // Add the userId field
  } | null;
}

export const userState = atom<User>({
  key: 'userState',
  default: {
    isLoggedIn: false,
    user: null,
  },
});
