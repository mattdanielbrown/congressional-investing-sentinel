import { create } from 'zustand';

const useStore = create((set) => ({
  members: [],
  setMembers: (members) => set({ members }),
  
  trades: [],
  setTrades: (trades) => set({ trades }),
  
  marketSummary: null,
  setMarketSummary: (marketSummary) => set({ marketSummary }),
  
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  
  error: null,
  setError: (error) => set({ error }),
}));

export default useStore;
