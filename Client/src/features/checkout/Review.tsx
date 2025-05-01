import { DeliveryDining, Payment } from "@mui/icons-material";
import { Divider, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form"

export default function Review(){

    const {getValues} = useFormContext()

    return(
        <Stack spacing={2} sx={{mb:3}}>
            <Stack direction="column" divider={<Divider/>} spacing={2} sx={{my:2}}>
                <div>
                    <Typography sx={{display: "flex", alignItems:"center"}} variant="h6" gutterBottom> Teslimat Bilgileri <DeliveryDining sx={{ml:1}} color="secondary"/> </Typography>
                    <Typography  sx={{ml:2 ,color:"text.secondary"}}gutterBottom> {getValues("firstname")+" "+ getValues("lastname")}</Typography>
                    <Typography  sx={{ml:2,color:"text.secondary"}}gutterBottom> {getValues("phone")}</Typography>
                    <Typography sx={{ml:2,color:"text.secondary"}} gutterBottom> {getValues("addressline")+" / "+ getValues("city")}</Typography>
                </div>
                <div>
                    <Typography sx={{display: "flex", alignItems:"center"}} variant="h6" gutterBottom> Ödeme Bilgileri <Payment color="secondary" sx={{ml:1}}/> </Typography>
                    <Typography  sx={{ml:2,color:"text.secondary"}} gutterBottom> {getValues("cart_name")}</Typography>
                    <Typography  sx={{ml:2,color:"text.secondary"}} gutterBottom> {getValues("cart_number")}</Typography>
                    <Typography  sx={{ml:2,color:"text.secondary"}} gutterBottom> {getValues("cart_expired_date")}</Typography>
                </div>
                
            </Stack>
        </Stack>
    ); 
}