import { ExitToApp, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, IconButton,  Stack, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router";
import { logout } from "../features/account/accountSlice";
import { useAppDispatch, useAppSelector } from "../store/Store";
import { clearCart } from "../features/cart/CartSlice";



const links =[
    {Title:"Home",to :"/"},
    {Title:"About",to :"/about"},
    {Title:"Contact",to :"/contact"},
    {Title:"Catalog",to :"/catalog"},
    {Title:"Errors",to :"/errors"}
    
]
const authLinks = [
    {title :"Login" , to:"/login"},
    {title :"Register" , to:"/register"},

]
const navStyles ={
    color:"inherit",
    textDecoration:"none",
    "&:hover": {
        color:"text.primary"
    },
    "&.active": {
        color:"warning.main"
    }
}

export default function Header(){
    const{cart} = useAppSelector(state => state.cart);
    const{user} = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();
    const itemCount = cart?.cartItems.reduce((total,item) => total + item.quantity,0)
    return(
   
        <AppBar position="static" sx={{mb:4}}>
        {/* sx ile css kodları yazılabiliyor. */}
            <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
                <Box sx={{display:"flex",alignItems:"center"}}>
                    <Typography variant="h6">E-commerce</Typography>
                    {/* stack bir listeyi yatay veya dikey sıralamamızı sağlıyor yatay sıralaması için direction row komutu vermemiz gerekiyor */}
                    <Stack direction="row"> 
                        {/* nav link yapmamız sayfanın yenilenmeden componentler arasında geçiş yapmasını sağlar */}
                        {links.map(p => <Button key={p.to} component={NavLink} to={p.to} sx={navStyles}> {p.Title}</Button>)}
                    </Stack>
                 </Box>
                 <Box sx={{display:"flex",alignItems:"center"}}>
                    <IconButton size="large" component={Link} to ="/Cart" edge="start" color="inherit">
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart/>
                        </Badge>
                   </IconButton>
                   {
                    user ? ( 
                        <Stack direction="row">
                            <Button sx={navStyles}> {user.name}</Button>
                            <Button  sx={navStyles} onClick={() =>{ 
                                dispatch(logout());
                                dispatch(clearCart());
                                }}> Logout <ExitToApp/> </Button>
                        </Stack>
                        
                    ): (
                        <Stack direction="row"> 
                        {/* nav link yapmamız sayfanın yenilenmeden componentler arasında geçiş yapmasını sağlar */}
                        {authLinks.map(p => <Button key={p.to} component={NavLink} to={p.to} sx={navStyles}> {p.title}</Button>)}
                    </Stack>
                    )
                   }
                  
                 </Box>
            </Toolbar>
       </AppBar>

    )
}