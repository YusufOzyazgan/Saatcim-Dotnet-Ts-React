import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function AddressForm() {

    const {register,formState: {errors}}  = useFormContext();

    return (

        <Grid2 container spacing={3}>
            <Grid2 size={{xs:12, md:6}}>
                <TextField
                    {...register("firstname", { required: "İsim girmelisiniz!" })}
                    label="İsim"
                    fullWidth autoFocus
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.firstname}
                 ></TextField> 
            </Grid2>
            <Grid2 size={{xs:12, md:6}}>
                <TextField
                    {...register("lastname", { required: "Soyisim girmelisiniz!" })}
                    label="Soyisim"
                    fullWidth autoFocus
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.lastname}
                 ></TextField> 
            </Grid2>
          
        
        </Grid2>





    )

}