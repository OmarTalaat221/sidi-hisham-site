import { configureStore, createSlice } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { authReducer } from "./auth";
import { messageReducer } from "./message";
import { favoritesReducer } from "./favoritesSlice";
import { jobApplicationReducer } from "./jobApplicationSlice";
import { combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { languageReducer } from "./languageSlice";
import { branchReducer } from "./branchSlice";

// Web-compatible storage adapter with SSR support
const createWebStorage = () => {
  const isServer = typeof window === 'undefined';
  
  if (isServer) {
    // Server-side: return a mock storage that does nothing
    return {
      getItem: () => Promise.resolve(null),
      setItem: () => Promise.resolve(),
      removeItem: () => Promise.resolve(),
    };
  }
  
  // Client-side: use localStorage
  return {
    getItem: (key) => {
      try {
        const item = localStorage.getItem(key);
        return Promise.resolve(item);
      } catch (error) {
        console.warn('localStorage.getItem failed:', error);
        return Promise.resolve(null);
      }
    },
    setItem: (key, value) => {
      try {
        localStorage.setItem(key, value);
        return Promise.resolve();
      } catch (error) {
        console.warn('localStorage.setItem failed:', error);
        return Promise.resolve();
      }
    },
    removeItem: (key) => {
      try {
        localStorage.removeItem(key);
        return Promise.resolve();
      } catch (error) {
        console.warn('localStorage.removeItem failed:', error);
        return Promise.resolve();
      }
    },
  };
};

// Custom middleware to handle state serialization issues
const stateValidationMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Check if language state is corrupted
  const state = store.getState();
  if (state.language && typeof state.language === 'string') {
    try {
      const parsedLanguage = JSON.parse(state.language);
      // Dispatch an action to fix the state
      store.dispatch({ type: 'language/fixState', payload: parsedLanguage });
    } catch (error) {
      console.error('Failed to parse language state:', error);
      // Reset to initial state
      store.dispatch({ type: 'language/resetState' });
    }
  }
  
  return result;
};

const persistConfig = {
  key: "root",
  storage: createWebStorage(),
  whitelist: ['cart', 'auth', 'favorites', 'language'], // Only persist these reducers
};

const reducers = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  message: messageReducer,
  branch: branchReducer,
  favorites: favoritesReducer,
  jobApplication: jobApplicationReducer,
  language: languageReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(stateValidationMiddleware),
});

// Create persistor only on client side
let persistor = null;
if (typeof window !== 'undefined') {
  persistor = persistStore(store);
}

export { persistor };
