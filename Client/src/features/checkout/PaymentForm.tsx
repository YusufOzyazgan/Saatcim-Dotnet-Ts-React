import { AddCard, AddCardSharp, Flare } from "@mui/icons-material";
import { Box, Grid2, Icon, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm(){
    const {register,formState: {errors}}  = useFormContext();
    
        return (
            <>
            <Typography sx={{display:"flex",alignItems:"center"}} variant="h4" marginBottom={2}>Kart Bilgileri <AddCard sx={{ml:1}}fontSize="large" color="primary"/></Typography>
            <Grid2 container spacing={2}>
                <Grid2 size={{xs:12, md:6}}>
                    <TextField
                        {...register("cart_name", { required: "Kart ismi zorunlu!" })}
                        label="Kartın Üstündeki İsim Soyisim"
                        fullWidth autoFocus
                        sx={{ mb: 1 }}
                        size="small"
                        error={!!errors.cart_name}
                     ></TextField> 
                </Grid2>
                <Grid2 size={{xs:12, md:6}}>
                    <TextField
                        {...register("cart_number", { required: "Kart numarası zorunlu!" })}
                        label="Kart Numarası"
                        fullWidth autoFocus
                        sx={{ mb: 1 }}
                        size="small"
                        error={!!errors.cart_number}
                     ></TextField> 
                </Grid2>
                <Grid2 size={{xs:12, md:6}}>
                    <TextField
                        {...register("cart_expired_date", { required: "Tarih girmelisiniz!" })}
                        label="Kart Kullanım Tarihi"
                        fullWidth autoFocus
                        sx={{ mb: 2 }}
                        size="small"
                        error={!!errors.cart_expired_date}
                     ></TextField> 
                </Grid2>
    
                <Grid2 size={{xs:12, md:6}}>
                    <TextField
                        {...register("cart_cvv", { required: "Cvv girmelisiniz!" })}
                        label="Cvv"
                        fullWidth autoFocus
                        sx={{ mb: 2 }}
                        size="small"
                        error={!!errors.cart_cvv}
                     ></TextField> 
                </Grid2>
    
              
            </Grid2>
    
            </>
    
    
    
        )
    
}