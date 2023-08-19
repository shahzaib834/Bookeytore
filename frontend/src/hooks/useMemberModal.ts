import { create } from 'zustand';

interface MemberModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginModal = create<MemberModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
