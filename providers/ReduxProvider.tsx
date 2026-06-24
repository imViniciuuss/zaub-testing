'use client';

import { type AppStore, makeStore } from '@/store';
import { hydrateCart } from '@/features/cart/cartSlice';
import { hydrateOrders } from '@/features/orders/ordersSlice';
import { StoreHydrationProvider } from '@/hooks/useStoreHydration';
import { loadPersistedState } from '@/store/persistedState';
import { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const persisted = loadPersistedState();
    if (persisted.cart) {
      storeRef.current?.dispatch(hydrateCart(persisted.cart));
    }
    if (persisted.orders) {
      storeRef.current?.dispatch(hydrateOrders(persisted.orders));
    }
    setIsHydrated(true);
  }, []);

  return (
    <Provider store={storeRef.current}>
      <StoreHydrationProvider value={isHydrated}>{children}</StoreHydrationProvider>
    </Provider>
  );
}
