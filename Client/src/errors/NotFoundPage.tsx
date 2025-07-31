import { Button, Card, Container, Divider, Typography } from "@mui/material";
import { NavLink } from "react-router";

export default function NotfoundPage(){
    return(
        <Container component={Card} sx={{ p: 3 }}>

        <Typography color="red" variant="h2">Not Found</Typography>
        <Divider/>
        <Button variant="contained" sx={{mt:2}} component={NavLink} to="/catalog">Alışverişe Devam Et</Button>
        </Container>
    )
}