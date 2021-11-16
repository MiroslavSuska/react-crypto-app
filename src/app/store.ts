import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoAPI';
import { cryptoNewsApi } from '../services/cryptoNewsAPI';

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
