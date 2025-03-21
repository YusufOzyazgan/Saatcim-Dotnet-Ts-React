import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../features/cart/CartSlice";
import { counterSlice } from "../features/counter/counterSlice";
import { catalogSlice } from "../features/catalog/CatalogSlice";
import { accountSlice } from "../features/account/accountSlice";

export const store = configureStore({
    reducer:{
        cart : cartSlice.reducer,
        counter: counterSlice.reducer,
        catalog: catalogSlice.reducer,
        account: accountSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();