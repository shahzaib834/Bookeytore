import { create } from 'zustand';

interface UserAuthStore {
  userAuth: boolean;
  user: { username: string };
  token: string;
  setUserAuth: (
    isUser: boolean,
    user: { username: string },
    token: string
  ) => void;
}

const useUserAuth = create<UserAuthStore>((set) => ({
  userAuth: false,
  user: { username: '' },
  token: '',
  setUserAuth: (isUser: boolean, user: { username: string }, token: string) =>
    set({ userAuth: isUser, user, token }),
}));

export default useUserAuth;
