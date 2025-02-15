import { configureStore } from '@reduxjs/toolkit'
import { adsApi } from '../api/adsApi'
import formReducer from "./slices/form.slice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER  } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'form',
  storage,
}

const persistedFormReducer = persistReducer(persistConfig, formReducer);

export const store = configureStore({
  reducer: {
    [adsApi.reducerPath]: adsApi.reducer,
    form: persistedFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], 
        ignoredPaths: ['register'], 
      },
    }).concat(adsApi.middleware),
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch