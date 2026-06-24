'use client';

import { createContext, useContext } from 'react';

const StoreHydrationContext = createContext(false);

export const StoreHydrationProvider = StoreHydrationContext.Provider;

export function useStoreHydration() {
  return useContext(StoreHydrationContext);
}
