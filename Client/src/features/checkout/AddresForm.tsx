import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function AddressForm() {

    const {register,formState: {errors}}  = useFormContext();

    return (

        <Grid2 container spacing={2}>
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
            <Grid2 size={{xs:12, md:6}}>
                <TextField
                    {...register("phone", { required: "Telefon numarası girmelisiniz!" })}
                    label="Phone"
                    fullWidth autoFocus
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.lastname}
                 ></TextField> 
            </Grid2>

            <Grid2 size={{xs:12, md:6}}>
                <TextField
                    {...register("city", { required: "Şehir ismi girmelisiniz!" })}
                    label="Şehir"
                    fullWidth autoFocus
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.city}
                 ></TextField> 
            </Grid2>

            <Grid2 size={{xs:12}}>
                <TextField
                    {...register("addressline", { required: "Adres girmelisiniz!" })}
                    label="Adres"
                    fullWidth autoFocus multiline 
                    rows={4}
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.addressline}
                 ></TextField> 
            </Grid2>
        
        </Grid2>





    )

}