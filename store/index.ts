import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ProcessItem, FilterState } from '../types';

interface ProcessStore {
  processes: ProcessItem[];
  filters: FilterState;
  isLoading: boolean;
  error: string | null;
  setProcesses: (processes: ProcessItem[]) => void;
  updateProcess: (id: string, updates: Partial<ProcessItem>) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProcessStore = create<ProcessStore>()(
  immer((set) => ({
    processes: [],
    filters: {
      search: '',
      dateRange: {
        startDate: new Date(),
        endDate: new Date(),
      },
    },
    isLoading: false,
    error: null,

    setProcesses: (processes) =>
      set((state) => {
        state.processes = processes;
      }),

    updateProcess: (id, updates) =>
      set((state) => {
        const index = state.processes.findIndex((p) => p.id === id);
        if (index !== -1) {
          state.processes[index] = { ...state.processes[index], ...updates };
        }
      }),

    setFilters: (filters) =>
      set((state) => {
        state.filters = { ...state.filters, ...filters };
      }),

    setLoading: (loading) =>
      set((state) => {
        state.isLoading = loading;
      }),

    setError: (error) =>
      set((state) => {
        state.error = error;
      }),
  }))
);