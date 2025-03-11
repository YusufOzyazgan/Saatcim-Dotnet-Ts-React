export interface Cart
{
    cartid :number,
    costumerId: string,
    cartItems :CartItem[],
    

}
export interface CartItem{
    productId : number,
    name: string,
    price:number,
    imageUrl: string,
    quantity: number,
}
