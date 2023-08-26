import { create } from 'zustand';

interface LoaderStore {
  isSpinning: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoader = create<LoaderStore>((set) => ({
  isSpinning: false,
  onOpen: () => set({ isSpinning: true }),
  onClose: () => set({ isSpinning: false }),
}));

export default useLoader;
