import { KeyboardArrowDown, Logout, Margin, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router";
import { logout } from "../features/account/accountSlice";
import { useAppDispatch, useAppSelector } from "../store/Store";
import { clearCart } from "../features/cart/CartSlice";
import { useState } from "react";



const links = [
    { Title: "Anasayfa", to: "/" },
    { Title: "Katalog", to: "/catalog" },
    { Title: "Hakkımızda", to: "/about" },
    { Title: "İletişim", to: "/contact" },
    { Title: "Hatalar", to: "/errors" }

]
const authLinks = [
    { title: "Login", to: "/login" },
    { title: "Register", to: "/register" },

]
const navStyles = {
    color: "secondary.main",
    textDecoration: "none",
    "&:hover": {
        color: "text.primary"
    },
    "&.active": {
        color: "warning.main"
    }
}

export default function Header() {
    const { cart } = useAppSelector(state => state.cart);
    const { user } = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();
    const itemCount = cart?.cartItems.reduce((total, item) => total + item.quantity, 0)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function handleMenuClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }
    function handleClose() {
        setAnchorEl(null);
    }
    // CornflowerBlue 
    return (

        <AppBar position="static" sx={{ mb: 4, bgcolor: "DeepSkyBlue" }}>
            {/* sx ile css kodları yazılabiliyor. */}

            <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between", mx: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>

                    <Button onClick={() => window.location.href = "/"} sx={{my:0,py:0}} >
                        <img width={110} src="../assets/saatcim_logo2.png" alt="" />
                    </Button>

                    {/* <Typography variant="h6" sx={{color:"SteelBlue",mr:1}}>Saatçim</Typography> */}
                    {/* stack bir listeyi yatay veya dikey sıralamamızı sağlıyor yatay sıralaması için direction row komutu vermemiz gerekiyor */}
                    <Stack direction="row">
                        {/* nav link yapmamız sayfanın yenilenmeden componentler arasında geçiş yapmasını sağlar */}
                        {links.map(p => <Button key={p.to} component={NavLink} to={p.to} sx={navStyles}> {p.Title}</Button>)}
                    </Stack>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton size="large" component={Link} to="/Cart" edge="start" color="inherit">
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    {
                        user ? (
                            <>
                                <Button id="user-button" onClick={handleMenuClick} endIcon={<KeyboardArrowDown />} sx={navStyles}> {user.name}</Button>


                                <Menu id="user-menu" open={open} onClose={handleClose} anchorEl={anchorEl} >

                                    <MenuItem component={Link} to="/orders">Siparişlerim</MenuItem>

                                    <MenuItem onClick={() => {
                                        dispatch(logout());
                                        dispatch(clearCart());
                                        handleClose();
                                    }}>Çıkış Yap<Logout/> </MenuItem>

                                </Menu>

                            </>

                        ) : (
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