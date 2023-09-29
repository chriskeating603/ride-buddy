import { create } from 'zustand';

interface InviteBuddiesModalState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

}

const useInviteBuddiesModal = create<InviteBuddiesModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));    

export default useInviteBuddiesModal;