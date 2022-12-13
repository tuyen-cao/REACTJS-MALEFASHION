import { BasketItem } from "models/types"


export const calculateTotalAmounts = (basketProducts:BasketItem[],productsInCart:[] ) => {
    const prods = productsInCart?.map((p: any, i: number) => {
        const newPro = (({ id, price }) => ({ id, price }))(p)
        return { ...newPro, ...basketProducts[i] }
    })
    return prods?.reduce(
        (preValue: number, prod: any) => preValue + prod.quantity * prod.price, 0).toFixed(2)
}