import { configureStore } from '@reduxjs/toolkit';
import { customersApi } from '../features/customerApi';

export const store = configureStore({
  reducer: {
    [customersApi.reducerPath]: customersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;