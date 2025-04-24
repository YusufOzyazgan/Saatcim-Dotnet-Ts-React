import { Alert, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AddCircleOutline, Delete, RemoveCircleOutline } from "@mui/icons-material";

import { toast } from "react-toastify";
import CartSummary from "./CartSummary";
import { currencyTRY } from "../../utils/formatCurrency";
import { addItemToCart, deleteItemFromCart } from "./CartSlice";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import { Link } from "react-router";

export default function ShoppingCartPage() {



  const{cart,status} = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  //const [status, setStatus] = useState({ loading: false, id: "" });

  //if (loading) return <div style={{display: "flex", justifyContent:"center",alignItems: "center" , height:"100vh"}}><CircularProgress/> </div>;




  if (cart?.cartItems.length === 0) return <Alert severity="warning"> Sepetinizde ürün yok</Alert>

  return (
    <>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right">Fiyat</TableCell>
            <TableCell align="right">Adet</TableCell>
            <TableCell align="right">Toplam</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.cartItems.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img style={{ height: "60px" }} src={`http://localhost:5291/images/${item.imageUrl}`} />
              </TableCell>

              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>

              <TableCell align="right">
                {currencyTRY.format(item.price)} 
              </TableCell>

              <TableCell align="right">
                <Button loading={status === "pendingAddItem_"+ item.productId } 
                  onClick={() =>dispatch(addItemToCart({productId:item.productId}))} >
                  <AddCircleOutline />
                </Button>
                {item.quantity}
                <Button loading={status == "pendingDeleteItem_" + item.productId+"_single"}
                  onClick={() => {
                    dispatch(deleteItemFromCart({productId: item.productId ,quantity: 1,key:"_single"}));
                   item.quantity == 1 && toast.error("Ürün sepetinizden silindi.");
                  }
                   } >
                  <RemoveCircleOutline />
                </Button>

              </TableCell>

              <TableCell align="right">
                {currencyTRY.format(item.price*item.quantity)}   
              </TableCell>



              <TableCell align="right">
                <Button loading={status === "pendingDeleteItem_"+ item.productId+"_all"} sx={{ color: "red" }}
                  onClick={() => {
                    dispatch(deleteItemFromCart({productId: item.productId ,quantity: item.quantity,key:"_all"}))
                    toast.error("Ürün sepetinizden silindi.");}}>
                  <Delete />
                </Button>
              </TableCell>

            </TableRow>
          ))}
          {/*  cart summary */}
          <CartSummary/>
        </TableBody>
      </Table>
    </TableContainer>
    <Box display="flex" justifyContent="flex-end" sx={{mt:3}}>
      <Button component={Link} to="/checkout" variant="contained" color="primary">Ödemeye Geç</Button>
    </Box>
    </>
  );
}