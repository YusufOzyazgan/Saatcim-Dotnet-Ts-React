import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Order } from "../../Model/IOrder";
import requests from "../../api/request";
import { currencyTRY } from "../../utils/formatCurrency";
import { ArrowRight, Close } from "@mui/icons-material";
import { yellow } from "@mui/material/colors";

const orderStatus = ["Beklemede", "Onaylandı", "Ödeme Hatası", "Tamamlandı"]

export default function OrderList() {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [open, setOpen] = useState(false);

    const subTotal = selectedOrder?.orderItems.reduce((toplam, item) => toplam + (item.quantity * item.price), 0) ?? 0;
    const tax = subTotal * 0.2;
    const total = subTotal + tax;

    function HandleDialogOpen(order: Order) {
        setSelectedOrder(order);
        setOpen(true);
        console.log(order);
    }
    function HandleDialogClose() {
        setOpen(false);
        setSelectedOrder(null);

    }

    useEffect(() => {
        setLoading(true);

        requests.Order.getOrders()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}><CircularProgress /> </div>;
    if (orders?.length === 0 ) return <Alert severity="warning"> Siparişiniz Bulunmamaktadır</Alert>
    
    return (
        <>
            <Typography variant="h3" sx={{ textAlign: "center", mb: 2 }}>Siparişlerim</Typography>
            
            <TableContainer component={Paper}>
                <Table sx={{ minWith: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sipariş Numarası</TableCell>
                            <TableCell>Sipariş Durumu </TableCell>
                            <TableCell>Sipariş Tarihi</TableCell>
                            <TableCell>Toplam</TableCell>
                            <TableCell>Detay</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell component="th" scope="row">{order.id}</TableCell>
                                <TableCell component="th" scope="row">{orderStatus[order.orderStatus]}</TableCell>
                                <TableCell component="th" scope="row">{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                                <TableCell component="th" scope="row">{currencyTRY.format(order.subTotal)}</TableCell>

                                <TableCell component="th" scope="row" sx={{ width: "100px" }}>
                                    <Button onClick={() => HandleDialogOpen(order)} size="small" variant="contained" endIcon={<ArrowRight />}>Detay</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog onClose={HandleDialogClose} open={open} fullWidth maxWidth="lg" >
                <DialogTitle>Sipariş No: #{selectedOrder?.id} </DialogTitle>
                <IconButton onClick={HandleDialogClose} sx={{
                    position: "absolute",
                    right: 8, top: 8
                }}>
                    <Close />
                </IconButton>
                <DialogContent dividers>
                    <Paper sx={{ p: 3 ,mb:2 }}>

                        <Typography variant="subtitle2" gutterBottom>Teslimat Bilgileri</Typography>
                        <Divider sx={{my:2}}/>
                        <Typography gutterBottom>{selectedOrder?.firstName} {selectedOrder?.lastName}</Typography>
                        <Typography gutterBottom>{selectedOrder?.phone}</Typography>
                        <Typography gutterBottom>{selectedOrder?.addresLine} / {selectedOrder?.city}</Typography>

                    </Paper>
                    <Typography variant="h5" gutterBottom>Ürün Bilgileri</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell> </TableCell>
                                    <TableCell align="right">İsim</TableCell>
                                    <TableCell align="right">Fiyat</TableCell>
                                    <TableCell align="right">Adet</TableCell>
                                    <TableCell align="right">Toplam</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedOrder?.orderItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell> <img style={{ height: "60px" }} src={`http://localhost:5291/images/${item.productImage}`} /></TableCell>
                                        <TableCell align="right">{item.productName}</TableCell>
                                        <TableCell align="right">{currencyTRY.format(item.price)} </TableCell>
                                        <TableCell align="right">{item.quantity}</TableCell>
                                        <TableCell align="right">  {currencyTRY.format(item.price * item.quantity)}   </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell align="right" colSpan={4}>Ara Toplam: </TableCell>
                                    <TableCell align="right" colSpan={4}>{currencyTRY.format(subTotal)}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell align="right" colSpan={4}>Vergi : </TableCell>
                                    <TableCell align="right" colSpan={4}>{currencyTRY.format(tax)}</TableCell>
                                </TableRow>
                                
                                <TableRow>
                                    <TableCell align="right" colSpan={4}>Toplam : </TableCell>
                                    <TableCell align="right" colSpan={4}>{currencyTRY.format(total)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                </DialogContent>

                <DialogActions>
                                <Button onClick={HandleDialogClose}>Kapat</Button>
                </DialogActions>
            </Dialog> 

        </>
    );
}