import { create } from 'zustand';
import { UserProfile } from '@/types';

type UserStore = {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
}

export const useUserStore = create<UserStore>((set) => {
  function setUser(user: UserProfile | null) {
    set({ user });
  }

  return {
    user: null,
    setUser,
  }
});
