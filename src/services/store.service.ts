import type { StateCreator } from 'zustand';

import { create } from 'zustand';

const storeResetFns = new Set<() => void>();

const storeService = {
  allState: <T>() => {
    return (stateCreator: StateCreator<T>) => {
      const store = create(stateCreator);
      const initialState = store.getInitialState();
      storeResetFns.add(() => {
        store.setState(initialState, true);
      });
      return store;
    };
  },

  resetAll: () => {
    storeService.allState();
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  },
};

export default storeService;
