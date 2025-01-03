import { create } from 'zustand';
import { ApiResponse, Chain, Contract, Protocol, UserProfile } from '@/types';

type UserStore = {
  isModalOpen: boolean;
  stars: {
    chains: Record<string, Chain>;
    contracts: Record<string, Contract>;
    protocols: Record<string, Protocol>;
  };
  user: UserProfile | null;
  loadStars: () => void;
  setUser: (user: UserProfile | null) => void;
  toggleModal: (open: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => {
  async function loadStars() {
    const response = await fetch('/api/stars');
    const json = (await response.json()) as ApiResponse<{
      chains: Record<string, Chain>;
      contracts: Record<string, Contract>;
      protocols: Record<string, Protocol>;
    }>;
    set({ stars: json.data });
  }
  function toggleModal(open: boolean) {
    set({ isModalOpen: open });
  }
  function setUser(user: UserProfile | null) {
    set({ user });
  }

  return {
    isModalOpen: false,
    user: null,
    stars: {
      chains: {},
      contracts: {},
      protocols: {},
    },
    loadStars,
    setUser,
    toggleModal,
  }
});
