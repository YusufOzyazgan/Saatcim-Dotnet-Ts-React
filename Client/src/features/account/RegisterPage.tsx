import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import requests from "../../api/request";
export default function RegisterPage() {

    // const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // !! işareti string veri türünü bool'a çevirir
    const { register, handleSubmit, setError, formState: { errors, isSubmitting, isValid } } = useForm({
        defaultValues: {
            username: "",
            email: "",
            fullName: "",
            password: ""
        },
        mode: "onTouched"
    });
    async function submitForm(data: FieldValues) {

        requests.Account.register(data)
            .then(() => {
                toast.success("Kayıt oluşturuldu.");
                navigate("/login");
            })
            .catch(result => {
                console.log("result:", result.data);

                const errors = Array.isArray(result.data) ? result.data : Object.values(result.data);

                errors.forEach((error: any) => {
                    if (error.code === "DuplicateUserName") {
                        setError("username", { message: error.description || error.message || "Kullanıcı adı zaten kullanılıyor!" });
                    } else if (error.code === "DuplicateEmail") {
                        setError("email", { message: error.message || "Bu e-posta adresi zaten kullanılıyor!" });
                    } else if (error.code === "PasswordRequiresUpper") {
                        setError("password", { message: error.message || "Şifre bir büyük harf içermelidir!" });
                    }
                });
            });






    }
    console
    return (
        <Container maxWidth="xs">
            {/* paper div işlevi görür fakat elevation gibi özelliklerle gölgelendirme elde edebiliriz.Box işlevinde*/}
            <Paper sx={{ mt: 8, padding: 1 }}>
                <Avatar sx={{ mx: "auto", color: "secondary.main", mb: 1 }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>Register</Typography>
                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 2 }}>
                    <TextField
                        {...register("fullName", { required: "İsim soyisim girmelisiniz!" })}
                        label="Enter FullName"
                        fullWidth
                        sx={{ mb: 2 }}
                        size="small"
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}> </TextField>

                    <TextField
                        {...register("username", { required: "Kullanıcı adı girmelisiniz!" })}
                        label="Enter Username"
                        fullWidth autoComplete="username"
                        sx={{ mb: 2 }}
                        size="small"
                        error={!!errors.username}
                        helperText={errors.username?.message}> </TextField>

                    <TextField
                        {...register("email", {
                            required: "Email girmelisiniz!",
                            pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: "Email is not valid."
                            }
                        })}
                        label="Enter Email"
                        fullWidth autoComplete="email"
                        sx={{ mb: 2 }}
                        size="small"
                        error={!!errors.email}
                        helperText={errors.email?.message}> </TextField>
                    <TextField
                        {...register("password", {
                            required: "Şifre Girmeilisiniz!", minLength: {
                                value: 6, message: "Şifre en az 6 karakter uzunluğunda olmalı!"
                            }
                        })}
                        label="Enter Passord"
                        type="password"
                        fullWidth autoComplete="new-password"
                        sx={{ mb: 2 }}
                        size="small"
                        error={!!errors.password}
                        helperText={errors.password?.message}> </TextField>


                    <Button
                        loading={isSubmitting}
                        type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>Register</Button>
                </Box>
            </Paper>
        </Container>
    );
}