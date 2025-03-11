import { useEffect } from "react";
import ProductList from "./ProductList";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {  fetchProducts, selectAllProducts } from "./CatalogSlice";

export default function CatalogPage(){
    
  const dispatch = useAppDispatch();
  const {status,isLoaded} = useAppSelector(state => state.catalog);
  const products =  useAppSelector(selectAllProducts);
  
  // use effect provide fetching for one time if it didnt, fecth will come into in the loop

  useEffect(() => {
      if(!isLoaded || products.length == 1){

        dispatch(fetchProducts());
      }
  }, [isLoaded]);
  
    if (status === "pendingFetchProducts") return <div style={{display: "flex", justifyContent:"center",alignItems: "center" , height:"100vh"}}><CircularProgress/> </div>;
    
    if (!products) return <h5>Products Not Found...</h5>
    return( <ProductList products={products}/>)
}