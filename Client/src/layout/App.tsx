
import {   useEffect, useState } from "react";
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import requests from "../api/request";
import { useAppDispatch } from "../hooks/hooks";
import { getCart, setCart } from "../features/cart/CartSlice";
import { logout, setUser } from "../features/account/accountSlice";
import Header from "./Header";


function App() {

  const dispatch = useAppDispatch();
  const[loading,setLoading] = useState(true);
  const initApp = async () => {
    // get cart, get user
    dispatch(setUser(JSON.parse(localStorage.getItem("user")!)))

    requests.Account.getUser()
    .then(user => {
      dispatch(setUser(user));
      localStorage.setItem("user",JSON.stringify(user));
    })
    .catch(error => {
      console.log(error);
      dispatch(logout());
    })



    await dispatch(getCart())

  }
  useEffect(()=> {
   initApp().finally(() => setLoading(false));
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
