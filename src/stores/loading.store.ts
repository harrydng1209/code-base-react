import { create } from 'zustand';

interface ILoadingStore {
  actions: {
    hideLoading: () => void;
    showLoading: () => void;
  };
  isLoading: boolean;
}

const loadingStore = create<ILoadingStore>((set) => ({
  actions: {
    hideLoading: () => set({ isLoading: false }),
    showLoading: () => set({ isLoading: true })
  },
  isLoading: false
}));

const useLoadingStore = () => {
  const actions = loadingStore((state) => state.actions);

  const isLoading = loadingStore((state) => state.isLoading);

  return { actions, isLoading };
};

export default useLoadingStore;
