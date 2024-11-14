import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/authSlice";
import  attackSlice  from "./feature/attackSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        attack: attackSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
