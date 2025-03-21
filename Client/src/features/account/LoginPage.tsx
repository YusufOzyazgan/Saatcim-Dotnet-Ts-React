import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { FieldValues, useForm} from "react-hook-form";
import { useAppDispatch } from "../../hooks/hooks";
import { loginUser } from "./accountSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
export default function LoginPage(){

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // !! işareti string veri türünü bool'a çevirir
    const {register,handleSubmit,formState :{errors,isSubmitting}}  = useForm({
        defaultValues : {
            username: "",
            password: "" 
        }
    });
    async function submitForm(data: FieldValues) {
        try{
            await dispatch(loginUser(data)).unwrap();
            toast.success("Giriş yapıldı.");
            navigate("/catalog");
        }catch(error : any){
         
            if (error?.error) {
                toast.error(error.error); 
            } else {
                toast.error("Giriş yapılırken beklenmeyen bir hata oluştu daha sonra tekrar deneyin.");
            }
            
        }
     
        
    }
    console
    return(
        <Container maxWidth="xs">
        {/* paper div işlevi görür fakat elevation gibi özelliklerle gölgelendirme elde edebiliriz.Box işlevinde*/}
        <Paper sx={{mt:8,padding:1}}>
        <Avatar sx={{mx:"auto",color:"secondary.main", mb:1}}>
            <LockOutlined/>
        </Avatar>
        <Typography component="h1" variant="h5" sx={{textAlign:"center"}}>Login</Typography>
        <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{mt:2}}> 
            <TextField 
            {...register("username",{required:"Kullanıcı adı girmelisiniz!"})}
            label="Enter Username" 
            fullWidth required autoFocus 
            sx={{mb:2}}
            size="small"
            error={!!errors.username}
            helperText={errors.username?.message}> </TextField>

            <TextField 
            {...register("password",{required:"Şifre Girmeilisiniz!", minLength:{
                value:6, message:"Şifre en az 6 karakter uzunluğunda olmalı!"}
            })}
            label="Enter Passord" 
            type="password" 
            fullWidth required autoFocus 
            sx={{mb:2}}
            size="small"
            error={!!errors.password}
            helperText={errors.password?.message}> </TextField>
            
            
            <Button 
             loading={isSubmitting} 
            type="submit" variant= "contained" fullWidth sx={{mt:1}}>Login</Button>
        </Box>
        </Paper>
        </Container>
    );
}