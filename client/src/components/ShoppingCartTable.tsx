import React, { useCallback, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Link } from 'react-router-dom'
import { ErrorFallback, myErrorHandler } from 'utilities/error-boundary-utils';
import ProductItemInCart from 'components/utilities/ProductItemInCart';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'store';
import { selectedProducts, updateCart } from 'reducers/productsReducer';
import { useProductsInCartData } from 'hooks/useProductsInCartData';
import { useUrlIdParams } from 'hooks/useUrlIdParams';
import PagePreloder from './PagePreloder';

const ShoppingCartTable = () => {
    const dispatch = useDispatch()
    const productInCart = useTypedSelector(selectedProducts);
    const [myCart, setCart] = useState(productInCart)

    const { isLoading,
        data: productsInCart, } = useProductsInCartData(useUrlIdParams(productInCart))

    const handleQuantityChange = (productId: number, value: number) => {
        const newArr = myCart.map(obj => {
            if (obj.id === productId) {
                return { ...obj, quantity: value };
            }
            return obj;
        });
        setCart(newArr)
    }
    
    
    const handleUpdateCart = () => {
        myCart.map((p) => dispatch(updateCart(p)))
    }
    useEffect(() => {
        setCart(productInCart)
    }, [productInCart])

    if (isLoading) return <>
        <PagePreloder />
    </>
    return (
        <>
            <div className="shopping-cart__table">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>

                        {productsInCart?.map((product: any,) => {
                            return <>
                                <ErrorBoundary
                                    FallbackComponent={ErrorFallback}
                                    onError={myErrorHandler}>
                                    <ProductItemInCart
                                        product={product}
                                        key={`productCart-${product.id}`}
                                        handleChange={handleQuantityChange}
                                    />
                                </ErrorBoundary>
                            </>
                        })}
                    </tbody>
                </table>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="continue__btn">
                        <Link to='/shop'>Continue Shopping</Link>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="continue__btn update__btn">
                        <button className='bg-black border-0' onClick={handleUpdateCart}>
                            <i className="fa fa-spinner" /> Update cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShoppingCartTable
