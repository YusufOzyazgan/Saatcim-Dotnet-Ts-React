import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

import InputMask from 'react-input-mask';

export default function AddressForm() {

    const { register, formState: { errors } } = useFormContext();

    return (

        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("firstname", { required: "İsim girmelisiniz!" })}
                    label="İsim"
                    fullWidth autoFocus
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.firstname}
                ></TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("lastname", { required: "Soyisim girmelisiniz!" })}
                    label="Soyisim"
                    fullWidth autoFocus
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.lastname}
                ></TextField>
            </Grid2>
            <Grid2  size={{ xs: 12, md: 6 }}>
                
                 <InputMask
                    mask="0999 999 99 99"
                    alwaysShowMask={true}
                    {...register("phone", {
                        required: "Telefon numarası zorunlu!",
                        pattern: {
                            value: /^\d{4} \d{3} \d{2} \d{2}$/,
                            message: "Geçerli bir telefon numarası giriniz!"
                        }
                    })}
                >
                    {(inputProps) => (
                        <TextField
                            {...inputProps}
                            label="Telefon Numarası"
                            fullWidth
                            sx={{ mb: 1 }}
                            size="small"
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    )}
                </InputMask>


                {/* <TextField
                    {...register("phone", { required: "Telefon numarası girmelisiniz!" })}
                    label="Phone"
                    fullWidth autoFocus
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.lastname}
                ></TextField> */}

            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("city", { required: "Şehir ismi girmelisiniz!" })}
                    label="Şehir"
                    fullWidth autoFocus
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.city}
                ></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
                <TextField
                    {...register("addresline", { required: "Adres girmelisiniz!" })}
                    label="Adres"
                    fullWidth autoFocus multiline
                    rows={4}
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.addresline}
                ></TextField>
            </Grid2>

        </Grid2>





    )

}