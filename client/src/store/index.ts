import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit';
import pokemonReducer from '@/features/pokemon/pokemonSlice';

// Store type
export type AppStore = ReturnType<typeof makeStore>;

// Store creator function
export function makeStore() {
  return configureStore({
    reducer: {
      pokemon: pokemonReducer,
    },
  });
}

// Create the store
export const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define the thunk action type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>; 