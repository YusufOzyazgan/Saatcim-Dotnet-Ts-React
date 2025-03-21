
import {   useEffect, useState } from "react";
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import {  ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";


import { useAppDispatch } from "../store/Store";
import { getCart } from "../features/cart/CartSlice";
import { getUser } from "../features/account/accountSlice";
import Header from "./Header";



function App() {

  const dispatch = useAppDispatch();

  const[loading,setLoading] = useState(true);

  const  initApp = async () => {
    await dispatch(getUser());
    await dispatch(getCart());

}

  useEffect(()=> {
   initApp().then(() => setLoading(false));
  },[]);

  if (loading) return <div style={{display: "flex", justifyContent:"center",alignItems: "center" , height:"100vh"}}><CircularProgress/> </div>;
  
  return (
    <>

      {/* <CssBaseline/> otomatik verilen margini kaldırır yazılar sola sağa sıfır olur */}
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"  />
      <CssBaseline />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )

}




export default App
