import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../store/Store"
import { toast } from "react-toastify";

export default function AuthGuard()
{
    const {user} = useAppSelector(state => state.account);
    const location = useLocation();
    if(!user){
        toast.error("Giriş yapmanız gerekli.");
        return <Navigate to="/login" state={{from: location}} />;
    }
 

    return <Outlet/>

}