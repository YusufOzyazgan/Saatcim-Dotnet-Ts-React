import { Box, Button,  Checkbox,  Grid2, Paper, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import Info from "./Info";
import AddressForm from "./AddresForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useState } from "react";
import { Check, ChevronLeftRounded, ChevronRightRounded, LocalShipping } from "@mui/icons-material";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import requests from "../../api/request";
import { useAppDispatch } from "../../store/Store";
import { clearCart } from "../cart/CartSlice";

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AddressForm />
        case 1:
            return <PaymentForm />
        case 2:
            return <Review />
        default:
            return <div>Unknown Step</div>
        //throw new Error("Bilinmeyen bir step");
    }
}

export default function CheckoutPage() {

    const [activeStep, setActiveStep] = useState(0);
    const steps = ["Teslimat Bilgileri", "Ödeme", "Sipariş Özeti"];
    const methods = useForm();
    const [orderId, setOrderId] =useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    async function handleNext(data: FieldValues) {

        if(activeStep === 2)
        {
            setLoading(true);
            try{
                setOrderId(await requests.Order.creteaOrder(data));
                dispatch(clearCart());
                setLoading(false);
            }catch(error:any){
                console.log(error);
                setLoading(false);
            }
            

        }
        if (activeStep < 3) {

            setActiveStep(activeStep + 1);
        }
    }
    function handlePrevious() {
        if (activeStep > 0) {
            (activeStep - 1);
        }
    }
    return (
        <FormProvider {...methods}>
            {/* paper gölge efekti veriyor */}
            <Paper>
                <Grid2 container spacing={5}>

                    {activeStep !== steps.length && (
                        
                         <Grid2 size={4} sx={{ borderRight: "1px solid", borderColor: "divider", p: 3 }}>
                             <Info />
                        </Grid2>
                    )}

                   

                    <Grid2 size={ activeStep !== steps.length ? 8 : 12} sx={{ p: 3 }}>
                        <Box>
                            <Stepper activeStep={activeStep} sx={{ height: 40, mb: 3 }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                        <Box>
                            {activeStep === steps.length ? (
                                <Stack spacing={2}>
                                    <Typography variant="h1">
                                    📦
                                    </Typography>

                                    <Typography variant="h5">Teşekkür ederiz. Siparişinizi aldık.</Typography>
                                    <Typography variant="body1" sx={{color: "text.secondary"}}>
                                        Sipariş numaranız <strong>{orderId}</strong>. Siparişiniz onaylandığında size bir e posta göndereceğiz.
                                    </Typography>

                                   <Button component="a" variant="contained" href="/orders" sx={{alignSelf: "start",width:{xs:"100%", sm:"auto"}}}>
                                    Siparişleri Listele
                                   </Button>
                                
                                </Stack>



                            ) : (
                                // handle next'e tiklandigi zaman submit islemi gerceklesecek
                                <form onSubmit={methods.handleSubmit(handleNext)}>
                                    {getStepContent(activeStep)}

                                    <Box>
                                        <Box sx={
                                            [
                                                { display: "flex" },
                                                activeStep !== 0 ?
                                                    { justifyContent: "space-between" } : { justifyContent: "flex-end" },

                                            ]

                                        }>
                                            {activeStep !== 0 &&
                                                <Button startIcon={<ChevronLeftRounded />} variant="contained"
                                                    onClick={handlePrevious}>Geri</Button>
                                            }

                                            <Button loading={loading} endIcon={<ChevronRightRounded />} variant="contained"
                                                type="submit" >{activeStep == 2 ? "Siparişi Tamamla" : "İleri"}  </Button>
                                        </Box>
                                    </Box>
                                </form>
                            )}

                        </Box>
                    </Grid2>
                </Grid2>
            </Paper >
        </FormProvider>
    );
}