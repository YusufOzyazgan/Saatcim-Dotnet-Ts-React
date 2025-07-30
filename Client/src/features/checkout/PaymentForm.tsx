import { AddCard } from "@mui/icons-material";
import { Grid2, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

import InputMask from 'react-input-mask';

export default function PaymentForm() {
    const { register, formState: { errors } } = useFormContext();

    return (
        <>
            <Typography sx={{ display: "flex", alignItems: "center" }} variant="h4" marginBottom={2}>Kart Bilgileri <AddCard sx={{ ml: 1 }} fontSize="large" color="primary" /></Typography>
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                        {...register("cardname", { required: "İsim zorunlu!" })}
                        label="Kart Üstündeki İsim Soyisim"
                        fullWidth autoFocus
                        sx={{ mb: 1 }}
                        size="small"
                        error={!!errors.cartname}
                    ></TextField>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    {/* <TextField
                        {...register("cartnumber", { required: "Kart numarası zorunlu!" })}
                        label="Kart Numarası"
                        fullWidth autoFocus
                        sx={{ mb: 1 }}
                        size="small"
                        error={!!errors.cartnumber}
                    ></TextField>
                     */}

                     <InputMask
                        mask="9999 9999 9999 9999"
                        alwaysShowMask={false}
                        {...register("cardnumber", {
                            required: "Kart numarası zorunlu!",
                            pattern: {
                                value: /^\d{4} \d{4} \d{4} \d{4}$/,
                                message: "Geçerli bir kart numarası giriniz!"
                            }
                        })}
                    >
                        {(register) => (
                            <TextField
                                {...register}
                                label="Kart Numarası"
                                fullWidth
                                sx={{ mb: 1 }}
                                size="small"
                                error={!!errors.cardnumber}
                                helperText={errors.cardnumber?.message}
                            />
                        )}
                    </InputMask> 
                </Grid2>
                <Grid2 size={{ xs: 6, md: 4 }}>

                    <InputMask
                        mask="99"
                        maskChar=""
                        {...register("cardexpiremonth", {
                            required: "Ay zorunlu!",
                            pattern: {
                                value: /^(0[1-9]|1[0-2])$/,
                                message: "01–12 arasında bir değer girin."
                            }
                        })}

                    >
                        {(inputProps) => (
                            <TextField
                                {...inputProps}

                                label="Kart Son Kullanım Ayı"
                                fullWidth
                                size="small"
                                type="text"
                                inputMode="numeric"
                                error={!!errors.cardexpiremonth}
                                helperText={errors.cardexpiremonth?.message}
                            />
                        )}
                    </InputMask>


                    {/* <TextField
                        {...register("cartexpiremonth", { required: "Yıl zorunlu!" })}
                        label="Kart Son Kullanım Ayı"
                        
                        fullWidth autoFocus
                        sx={{ mb: 2 }}
                        size="small"
                        error={!!errors.cartexpiremonth}
                    ></TextField> */}
                </Grid2>
                <Grid2 size={{ xs: 6, md: 4 }}>
                    <InputMask
                        mask="9999"
                        maskChar=""
                        {...register("cardexpireyear", {
                            required: "Yıl zorunlu!",
                            pattern: {
                                value: /^(20[2-9][0-9])$/,
                                message: "Geçerli bir yıl girin! (örn: 2025)"
                            }
                        })}
                    >
                        {(inputProps) => (
                            <TextField
                                {...inputProps}
                                label="Kart Son Kullanım Yılı"
                                fullWidth
                                size="small"
                                type="text"
                                inputMode="numeric"
                                error={!!errors.cardexpireyear}
                                helperText={errors.cardexpireyear?.message}
                            />
                        )}
                    </InputMask>
                    
                    {/* <TextField
                        {...register("cartexpireyear", { required: "Ay zorunlu!" })}
                        label="Kart Son Kullanım Yılı"
                        fullWidth autoFocus
                        sx={{ mb: 2 }}
                        size="small"
                        error={!!errors.cartexpireyear}
                    ></TextField> */}
                </Grid2>

                <Grid2 size={{ xs: 12, md: 4 }}>
                    <TextField
                        {...register("cardcvc", { required: "Cvc girmelisiniz!" })}
                        label="Cvc"
                        fullWidth autoFocus
                        sx={{ mb: 2 }}
                        size="small"
                        error={!!errors.cardcvc}
                    ></TextField>
                </Grid2>


            </Grid2>

        </>



    )

}