import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../Model/IProduct";
import requests from "../../api/request";
import { RootState } from "../../store/Store";

export const fetchProducts = createAsyncThunk<IProduct[]>(
    "catalog/fetchProducts",
    async() => {
    return await requests.Catalog.list();
    }
)
export const fetchProductById = createAsyncThunk<IProduct, number>(
    "catalog/fetchProductById",
    async(productId) => {
    return await requests.Catalog.details(productId)
    }
)
const productsAdapter = createEntityAdapter<IProduct>();
const initialState = productsAdapter.getInitialState({
    status:"idle",
    isLoaded : false    
});
export const catalogSlice = createSlice({

    name: "catalog",
    initialState,
    reducers:{},
    extraReducers:(builder => {
        builder.addCase(fetchProducts.pending,(state) => {
            state.status = "pendingFetchProducts";
        });
        builder.addCase(fetchProducts.fulfilled,(state,action) => {
            productsAdapter.setAll(state,action.payload);
            state.status = "idle";
            state.isLoaded = true;
        });
        builder.addCase(fetchProducts.rejected,(state) => {
            state.status = "idle";
            
        });
        
        // product details
        builder.addCase(fetchProductById.pending,(state) => {
            state.status = "pendingFetchProduct";
        });
        builder.addCase(fetchProductById.fulfilled,(state,action) => {
            // upsert update ile insert karisimi varsa getirir yoksa ekler
            productsAdapter.upsertOne(state,action.payload);
            state.status = "idle";
            state.isLoaded = true;
        });
        builder.addCase(fetchProductById.rejected,(state) => {
            state.status = "idle";
        });
    })
})
export const {
    selectById : selectProductById,
    selectIds: selectProductIds,
    selectEntities : selectProductEntities,
    selectAll: selectAllProducts,
    selectTotal: selectTotalProducts,
} = productsAdapter.getSelectors((state: RootState)=> state.catalog);