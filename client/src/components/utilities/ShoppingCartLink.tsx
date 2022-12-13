import { useProductsInCartData } from 'hooks/useProductsInCartData';
import { useUrlIdParams } from 'hooks/useUrlIdParams';
import React from 'react'
import { Link } from 'react-router-dom'
import { selectedProducts } from 'reducers/productsReducer';
import { useTypedSelector } from 'store';
import styled from 'styled-components'
import { calculateTotalAmounts } from 'utilities/logic-fncs/calculateTotalAmounts';

const ShoppingCartLink = () => {

    const productInCart = useTypedSelector(selectedProducts);
    const { isLoading, data: productsInCart, isSuccess, error } = useProductsInCartData(useUrlIdParams(productInCart))

    return (
        <>
            {productInCart.length > 0 && isSuccess && <>
                <Link to='shop/shopping-cart'>
                    <img src="/img/icon/cart.png" alt="" />
                    <BadgeStyled className="badge rounded-pill bg-danger">{productInCart?.reduce(
                        (preValue: number, prod: any) => preValue + prod.quantity, 0)}</BadgeStyled>
                </Link>
                <div className="price">{calculateTotalAmounts(productInCart, productsInCart)}</div>
            </>}
        </>
    )
}

export default React.memo(ShoppingCartLink)

const BadgeStyled = styled.span`
    color: #ffffff!important;
    border-radius: 10px;
    left: -5px;
    top: 15px!important;
`;