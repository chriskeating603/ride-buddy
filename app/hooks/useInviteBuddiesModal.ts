import { create } from 'zustand';

interface InviteBuddiesModalState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

}

const useInviteBuddiesModal = create<InviteBuddiesModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));    

export default useInviteBuddiesModal;