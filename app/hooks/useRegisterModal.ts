import { create } from 'zustand';
interface LoginModalState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

}

const useLoginModal = create<LoginModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));    

export default useLoginModal;