import { Button, CircularProgress, Divider, Grid2, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router";
import { AddShoppingCart, CurrencyLira } from "@mui/icons-material";
import { toast } from "react-toastify";
import { currencyTRY } from "../../utils/formatCurrency";
import { addItemToCart } from "../cart/CartSlice";
import {  fetchProductById, selectProductById } from "./CatalogSlice";
import { useAppDispatch, useAppSelector } from "../../store/Store";

export default function ProductDetailsPage() {
    // burda urldeki idyi çekeriz
    const { id } = useParams();
    //const [product, setProduct] = useState<IProduct | null>();
    const product = useAppSelector(state => selectProductById(state,Number(id)));

    const {cart,status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const {status : loading} = useAppSelector(state=> state.catalog)
    const item = cart?.cartItems.find(i => i.productId == product?.id);

    useEffect(() => {
       if(!product && id) dispatch(fetchProductById(parseInt(id)))
    }, [id])
    // id üzerinde bir değişiklik varsa fetch requesti bir daha çalışacak
    
    function handleItem(id:number){
       dispatch(addItemToCart({productId: id}));
       toast.success("Ürün sepetinize eklendi");
    }
    
    if (loading ==="pendingFetchProduct") return <div style={{display: "flex", justifyContent:"center",alignItems: "center" , height:"100vh"}}><CircularProgress/> </div>;

    if (!product) return <h5>Product Not Found...</h5>

    return (
        <Grid2 container spacing={6}>

            <Grid2 size={{ xl: 3, lg: 4, md: 5, sm: 6, xs: 12 }}>
                <img src={`http://localhost:5291/images/${product.imageUrl}`} style={{ width: "100%" }} />
            </Grid2>

            <Grid2 size={{ xl: 9, lg: 8, md: 7, sm: 6, xs: 12 }}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h4" color="secondary(">Price: {currencyTRY.format(product.price)}   </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Product Name:</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description:</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Stock:</TableCell>
                                <TableCell>{product.stock}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>

                <Stack direction="row" sx={{mt:3, alignItems:"center"}}> 
                    <Button  variant="outlined" loadingPosition="start" sx={{mr:2}} startIcon={<AddShoppingCart/>}  
                    loading={status != "idle"} onClick={() => handleItem(product.id)}>
                        Sepete Ekle
                    </Button>
                    {
                        item?.quantity! > 0 && (
                            <Typography color="success"variant="body2" > Sepetinize {item?.quantity} adet eklendi.</Typography>
                        )
                    }
                </Stack>


            </Grid2>
        </Grid2>
    )
}