import { TableCell, TableRow } from "@mui/material";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppSelector } from "../../hooks/hooks";

export default function(){
   const{cart} = useAppSelector(state => state.cart);
    
    const subTotal = cart?.cartItems.reduce((toplam,item) => toplam + (item.quantity * item.price) ,0) ?? 0;
    const tax = subTotal * 0.2;
    const total = subTotal + tax;

    return (
        <>
            <TableRow sx={{borderBottom : "none"}}>
                <TableCell colSpan={5} align="right" sx={{borderBottom : "none"}}> Ara Toplam</TableCell>
                <TableCell align="right">{currencyTRY.format(subTotal)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={5} sx={{borderBottom : "none"}}  align="right"> Vergi (%20)</TableCell>
                <TableCell  align="right">{currencyTRY.format(tax)} </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={5} sx={{borderBottom : "none"}} align="right">Toplam</TableCell>
                <TableCell  align="right">{currencyTRY.format(total)}</TableCell>
            </TableRow>
        </>
    )
}