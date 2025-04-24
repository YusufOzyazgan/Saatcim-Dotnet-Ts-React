import { Box, Button, getStepContentUtilityClass, Grid2, Paper, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import Info from "./Info";
import AddressForm from "./AddresForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useState } from "react";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { FormProvider, useForm } from "react-hook-form";

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

    function handleNext() {
        if (activeStep < 3) {

            setActiveStep(activeStep + 1);
        }
    }
    function handlePrevious() {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    }
    return (
        <FormProvider {...methods}>
            {/* paper gölge efekti veriyor */}
            <Paper>
                <Grid2 container spacing={5}>
                    <Grid2 size={4} sx={{ borderRight: "1px solid", borderColor: "divider", p: 3 }}>
                        <Info />
                    </Grid2>

                    <Grid2 size={8} sx={{ p: 3 }}>
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
                                <h2>Sipariş tamamlandı</h2>
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

                                            <Button endIcon={<ChevronRightRounded />} variant="contained"
                                                type="submit" >İleri</Button>
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