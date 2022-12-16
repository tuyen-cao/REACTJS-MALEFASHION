import styled from 'styled-components'
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux'
import { useTypedSelector } from 'store';
import { removeItemCart, selectedProducts } from 'reducers/productsReducer';
import { Product } from 'models/types';

const ProductItemInCart = (props: {product: Product, handleChange: (id:number, value:number) => void}) => {
    const dispatch = useDispatch()
    const productInCart = useTypedSelector(selectedProducts);
    const product = props.product
    const index = productInCart.findIndex((p) => p.id === product.id)
    const [price, setPrice] = useState(productInCart[index].quantity * product.price)

    const handleQuantityChange = useCallback((value: number) => {
        setPrice(value * product.price)
        props.handleChange(product.id, value)
    }, [])
    const handleDelete = () => {
        dispatch(removeItemCart(product.id))
    }
    return <>
        <TableRowStyled>
            <td className="product__cart__item">
                <div className="product__cart__item__pic">
                    <img src={product.image} alt="" />
                </div>
                <div className="product__cart__item__text">
                    <h6>{product.title}</h6>
                    <h5>{product.price}</h5>
                </div>
            </td>
           
            <td className="quantity__item">
                <div className="quantity">
                    <div className="pro-qty-2">
                        <input type="number"
                            defaultValue={productInCart[index].quantity}
                            onChange={(e) => { handleQuantityChange(Number(e.target.value)) }}
                            min="1" max="100" />
                    </div>
                </div>
            </td>
            <td className="cart__price">{price.toFixed(2)}</td>
            <td className="cart__close">
                <button className='bg-transparent border-0' onClick={handleDelete}><i className="fa fa-close" /></button>
            </td>
        </TableRowStyled>
    </>
}
export default React.memo(ProductItemInCart)

const TableRowStyled = styled.tr`
    .product__cart__item__pic {
        max-width: 90px;
    }
`;
