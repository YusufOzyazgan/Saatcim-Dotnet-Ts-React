import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import HomePage from "../features/HomePage";
import AboutPage from "../features/AboutPage";
import ContactPage from "../features/ContactPage";

import ProductDetailsPage from "../features/catalog/ProductDetails";
import CatalogPage from "../features/catalog/CatalogPage";
import ErrorPage from "../features/catalog/ErrorPage";
import ServerErrorPage from "../errors/ServerErrorPage";
import NotfoundPage from "../errors/NotFoundPage";
import ShoppingCartPage from "../features/cart/ShoppingCartPage";
import LoginPage from "../features/account/LoginPage";
import RegisterPage from "../features/account/RegisterPage";


export const router = createBrowserRouter([
    {   
        path : "/",
        element :<App/>,
        children:[
            {path: "",element: <HomePage/>},
            {path: "about",element: <AboutPage/>},
            {path: "contact",element: <ContactPage/>},
            {path: "catalog",element: <CatalogPage/>},
            {path: "catalog/:id",element: <ProductDetailsPage/>},
            {path: "cart",element: <ShoppingCartPage/>},
            {path: "login",element: <LoginPage/>},
            {path: "register",element: <RegisterPage/>},
            {path: "errors",element: <ErrorPage/>},
            {path: "server-error",element: <ServerErrorPage/>},
            {path: "not-found",element: <NotfoundPage/>},
            {path: "*", element : <Navigate to="/not-found"/>}
            
            
        ]
    }
])