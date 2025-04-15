
import { create } from 'zustand';

interface ProfileState {
  isProfileOpen: boolean;
  openProfile: () => void;
  closeProfile: () => void;
  toggleProfile: () => void;
}

export const useProfile = create<ProfileState>((set) => ({
  isProfileOpen: false,
  openProfile: () => set({ isProfileOpen: true }),
  closeProfile: () => set({ isProfileOpen: false }),
  toggleProfile: () => set((state) => ({ isProfileOpen: !state.isProfileOpen })),
}));
