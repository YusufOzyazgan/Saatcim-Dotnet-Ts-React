import { ExitToApp, KeyboardArrowDown, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, Container, IconButton,  Menu,  MenuItem,  Stack, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router";
import { logout } from "../features/account/accountSlice";
import { useAppDispatch, useAppSelector } from "../store/Store";
import { clearCart } from "../features/cart/CartSlice";
import { useState } from "react";



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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
    const open = Boolean(anchorEl);

    function handleMenuClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }
    function handleClose(){
        setAnchorEl(null);
    }

    return(
   
        <AppBar position="static" sx={{mb:4}}>
        {/* sx ile css kodları yazılabiliyor. */}
        <Container maxWidth={"lg"}>
            <Toolbar disableGutters sx={{display:"flex", justifyContent:"space-between"}}>
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
                        <>
                            <Button id={"user-button"}onClick={handleMenuClick} endIcon={<KeyboardArrowDown/>} sx={navStyles}> {user.name}</Button>
                            

                            <Menu id={"user-menu"} open={open} onClose={handleClose} anchorEl={anchorEl} >

                                <MenuItem>Orders</MenuItem>
                                
                                <MenuItem onClick={() =>{ 
                                dispatch(logout());
                                dispatch(clearCart());
                                }}>Logout</MenuItem>
                            
                            </Menu>
                            
                        </>
                        
                    ): (
                        <Stack direction="row"> 
                        {/* nav link yapmamız sayfanın yenilenmeden componentler arasında geçiş yapmasını sağlar */}
                        {authLinks.map(p => <Button key={p.to} component={NavLink} to={p.to} sx={navStyles}> {p.title}</Button>)}
                    </Stack>
                    )
                   }
                  
                 </Box>
            </Toolbar>
       </Container>
       </AppBar>

    )
}