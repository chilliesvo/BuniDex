import create from 'zustand';

type StoreState = {
  isFullPageLoading: boolean;
  setFullPageLoading: (status: boolean) => void;
};

// @ts-ignore
const useAppStore = create<StoreState>((set) => ({
  isFullPageLoading: false,
  setFullPageLoading: (status: boolean) =>
    set(() => ({ isFullPageLoading: status })),
}));

export default useAppStore;
