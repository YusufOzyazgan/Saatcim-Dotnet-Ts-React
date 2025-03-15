import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import requests from "../../api/request";

export default function LoginPage(){
    // const [username, SetUsername] = useState("");
    // const [password, SetPassword] = useState("");

    const [values,setValues] = useState({
        username: "",
        password:""
    })
    function handleSubmit(e:any){
        // preventDefault sayfanın yenilenmesini engeller
        e.preventDefault();
        console.log(values);
        requests.Account.login(values)
    }
    function handleInputChange(e:any){
        const{name,value} = e.target;
        // asagidaki sistem name göre değeri günvceller örneğin username: "abc"
        setValues({...values,[name]:value}) ;
      }
    return(
        <Container maxWidth="xs">
        {/* paper div işlevi görür fakat elevation gibi özelliklerle gölgelendirme elde edebiliriz.Box işlevinde*/}
        <Paper sx={{mt:8,padding:1}}>
        <Avatar sx={{mx:"auto",color:"secondary.main", mb:1}}>
            <LockOutlined/>
        </Avatar>
        <Typography component="h1" variant="h5" sx={{textAlign:"center"}}>Login</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt:2}}> 
            <TextField 
            name="username"
            value={values.username}
            onChange={handleInputChange}
            label="Enter Username" 
            fullWidth required autoFocus 
            sx={{mb:2}}
            size="small"> </TextField>

            <TextField 
            name="password"
            value={values.password}
            onChange={handleInputChange}
            label="Enter Passord" 
            type="password" 
            fullWidth required autoFocus 
            sx={{mb:2}}
            size="small"> </TextField>
            
            <Button type="submit" variant= "contained" fullWidth sx={{mt:1}}>Login</Button>
        </Box>
        </Paper>
        </Container>
    );
}