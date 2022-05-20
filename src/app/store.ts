import { configureStore } from "@reduxjs/toolkit";
import { brainAgricultureApi } from "../services/brain-agriculture";

export const store = configureStore({
  reducer: {
    [brainAgricultureApi.reducerPath]: brainAgricultureApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(brainAgricultureApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
