import { BasketItem, Product, ProductHasQuantity } from "models/types"


export const calculateTotalAmounts = (basketProducts:BasketItem[],productsInCart:[] ) => {
    const prods = productsInCart?.map((p: Product, i: number) => {
        const newPro = (({ id, price }) => ({ id, price }))(p)
        return { ...newPro, ...basketProducts[i] } as ProductHasQuantity
    })
    return prods?.reduce(
        (preValue: number, prod: ProductHasQuantity) => preValue + prod.quantity * prod.price, 0).toFixed(2)
}