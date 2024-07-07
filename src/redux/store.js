import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";

const persistConfig = {
    key: "root",
    storage,
    whiteList: ["LoginRedux"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistedStore = persistStore(store)