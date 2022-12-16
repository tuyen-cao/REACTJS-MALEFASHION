import { useProductsInCartData } from 'hooks/useProductsInCartData';
import { useUrlIdParams } from 'hooks/useUrlIdParams';
import React, { useCallback, useEffect, useState } from 'react'
import { getPromo } from 'reducers/paymentReducer';
import { selectedProducts } from 'reducers/productsReducer';
import { useTypedSelector } from 'store';
import { calculateTotalAmounts } from 'utilities/logic-fncs/calculateTotalAmounts';

const CartTotal: React.FC<{wrapperClassName?: string}> = ( props) => {
    const {wrapperClassName = ''} = props
    const discount = useTypedSelector(getPromo)
    const productInCart = useTypedSelector(selectedProducts);
    const { isLoading, data: productsInCart, isSuccess, error } = useProductsInCartData(useUrlIdParams(productInCart))
    const [subtotal, setSubTotal] = useState(calculateTotalAmounts(productInCart, productsInCart))
  
    useEffect(() => {
         setSubTotal(calculateTotalAmounts(productInCart, productsInCart)) 
    })
    return (
        <>
            <ul className={wrapperClassName}>
                <li>
                    Subtotal <span>$ {subtotal}</span>
                </li>
                {discount > 0 ? <>
                    <li>
                        Discount ({discount}%) <span>$ {(Number(subtotal) * discount / 100).toFixed(2)}</span>
                    </li>
                </> : null}
                <li>
                    Total <span>$ {(Number(subtotal) * (1 - discount / 100)).toFixed(2)}</span>
                </li>
            </ul>
        </>
    )
}

export default CartTotal
