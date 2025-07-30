import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { IProduct } from "../../Model/IProduct"
import { AddShoppingCart,  Search } from "@mui/icons-material"
import { Link } from "react-router"
import { currencyTRY } from "../../utils/formatCurrency";
import { addItemToCart } from "../cart/CartSlice";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import { toast } from "react-toastify";



interface Props {
  product: IProduct,

}


export default function Product({ product }: Props) {

 const {status} = useAppSelector(state => state.cart)
 
  const dispatch = useAppDispatch();

  

  return (

    <Card >
      {/* aşağıdkai containin anlamı 160 px yüksekliğe göre kendisini responsive olarak ayarlaması */}
      <CardMedia sx={{ height: 160, backgroundSize: "contain" }} image={`http://localhost:5291/images/${product.imageUrl}`} />

      <CardContent>
        {/* Aşağıdaki kısımda h2 ile bir yazı oluşturuyorsun fakat boyu h6 seviyesinde oluyor */}
        <Typography gutterBottom variant="h6" component="h2" color="text-secondary">
          {product.name}
        </Typography>
        <Typography variant="body2" color="secondary"> {currencyTRY.format(product.price) } </Typography>
      </CardContent>

      <CardActions>
        {/* <Button variant="outlined"  size="small"  >Add to cart</Button> */}
        <Button variant="outlined" size="small" loading={status === "pendingAddItem_"+product.id}
          onClick={() => { 
            dispatch(addItemToCart({productId: product.id}));
            toast.success("Ürün sepetinize eklendi");
          }}
          startIcon={<AddShoppingCart />} >Sepete Ekle </Button>

        <Button size="small" component={Link} to={`/catalog/${product.id}`} startIcon={<Search />} variant="outlined" color="primary" >View</Button>
      </CardActions>
    </Card>

  )
}