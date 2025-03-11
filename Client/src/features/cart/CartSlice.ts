import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../Model/ICart";
import requests from "../../api/request";

interface CartState{
    cart: Cart | null;
    status: string;
}
const initialState : CartState = {
    cart :null ,
    status:"idle"
}

// asagida geri dönus degerini cart olarak belirledik
export const addItemToCart = createAsyncThunk<Cart, {productId: number, quantity? : number}>(
    "cart/addItemToCart",
    async ({productId,quantity =1}) =>{
        try{

            return await requests.Cart.addItem(productId,quantity);
        }
        catch(error)
        {
            console.log(error)
        }
    }
);
export const deleteItemFromCart = createAsyncThunk<Cart, {productId: number, quantity? : number,key?:string}>(
    "cart/deleteItemFromCart",
    async ({productId,quantity =1}) =>{
        try{

            return await requests.Cart.deleteItem(productId,quantity);
        }
        catch(error)
        {
            console.log(error)
        }
    }
);


export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        setCart: (state,action) => {
            state.cart = action.payload
        }
    },
    extraReducers:(builder) => {
        //add item
        builder.addCase(addItemToCart.pending,(state,action)=> {
            console.log(action);
            state.status = "pendingAddItem_" + action.meta.arg.productId;
        });
        builder.addCase(addItemToCart.fulfilled,(state,action)=> {
            console.log(action);
            state.cart = action.payload;
            state.status = "idle"
        });
        builder.addCase(addItemToCart.rejected,(state)=> {
            state.status = "idle"
        });
    
        // delte item

        builder.addCase(deleteItemFromCart.pending,(state,action)=> {
            console.log(action);
            state.status = "pendingDeleteItem_"+ action.meta.arg.productId + action.meta.arg.key;
        });
        builder.addCase(deleteItemFromCart.fulfilled,(state,action)=> {
            console.log(action);
            state.cart = action.payload;
            state.status = "idle";
        });
        builder.addCase(deleteItemFromCart.rejected,(state)=> {
            state.status = "idle";
        });
    
    
    }

});
export const {setCart} = cartSlice.actions