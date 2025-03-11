export interface IProduct
{
    id :number,
    name :string,
    price :number,
    description? :string,
    imageUrl ?: string,
    stock?:number,
    isActive:boolean

}