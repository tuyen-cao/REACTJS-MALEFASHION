import { useProductsInCartData } from 'hooks/useProductsInCartData';
import { useUrlIdParams } from 'hooks/useUrlIdParams';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { addToCart, selectedProducts } from 'reducers/productsReducer';
import { useTypedSelector } from 'store';
import styled from 'styled-components'

const ShoppingCartLink = () => {
    const dispatch = useDispatch()
    const [totalAmounts, setTotalAmounts] = useState(0)
    const productInCart = useTypedSelector(selectedProducts);

    const { isLoading, data: productsInCart, isSuccess, error } = useProductsInCartData(useUrlIdParams(productInCart))

    const calculateTotalAmounts = () => {
        const prods = productsInCart?.map((p: any, i: number) => {
            const newPro = (({ id, price }) => ({ id, price }))(p)
            return { ...newPro, ...productInCart[i] }
        })
        setTotalAmounts(prods?.reduce(
            (preValue: number, prod: any) => preValue + prod.quantity * prod.price, 0))
    }
   
    useEffect(() => {
        calculateTotalAmounts()
    }, [isLoading, productsInCart, productInCart])
    return (
        <>
            {productInCart.length > 0 && <>
                <Link to='shop/shopping-cart'>
                    <img src="/img/icon/cart.png" alt="" />
                    <BadgeStyled className="badge rounded-pill bg-danger">{productInCart?.reduce(
                        (preValue: number, prod: any) => preValue + prod.quantity, 0)}</BadgeStyled>
                </Link>
                <div className="price">{totalAmounts}</div>
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