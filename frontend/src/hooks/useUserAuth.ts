import { create } from 'zustand';

interface UserAuthStore {
  userAuth: boolean;
  user: {};
  token: string;
  setUserAuth: (isUser: boolean, user: {}, token: string) => void;
}

const useUserAuth = create<UserAuthStore>((set) => ({
  userAuth: false,
  user: {},
  token: '',
  setUserAuth: (isUser: boolean, user: {}, token: string) =>
    set({ userAuth: isUser, user, token }),
}));

export default useUserAuth;
