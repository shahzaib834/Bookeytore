import { create } from 'zustand';

interface UserAuthStore {
  userAuth: boolean;
  user: {};
  setUserAuth: (isUser: boolean, user: {}) => void;
}

const useUserAuth = create<UserAuthStore>((set) => ({
  userAuth: false,
  user: {},
  setUserAuth: (isUser: boolean, user: {}) => set({ userAuth: isUser, user }),
}));

export default useUserAuth;
