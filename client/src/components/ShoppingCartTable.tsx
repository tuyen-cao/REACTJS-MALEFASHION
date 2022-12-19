import React, { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Link } from 'react-router-dom'
import { ErrorFallback, myErrorHandler } from 'utilities/errorBoundaryUtils';
import ProductItemInCart from 'components/utilities/ProductItemInCart';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'store';
import { selectedProducts, updateCart } from 'reducers/productsReducer';
import { useProductsInCartData } from 'hooks/useProductsInCartData';
import { useUrlIdParams } from 'hooks/useUrlIdParams';
import PagePreloder from './PagePreloder';
import { Product } from 'models/types';
import BlackButton from './utilities/BlackButton';

const ShoppingCartTable: React.FC = () => {
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
            <ShoppingCartProductsTable products={productsInCart} handleQuantityChange={handleQuantityChange} />
            <ShoppingCartTableActions handleUpdateCart={handleUpdateCart} />
        </>
    )
}
export default React.memo(ShoppingCartTable)

const ShoppingCartProductsTable = (props: { products: Product[], handleQuantityChange: (productId: number, value: number) => void }) => {
    const { products, handleQuantityChange } = props
    return <>
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

                    {products?.map((product: Product) => {
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
    </>
}


const ShoppingCartTableActions = (props: { handleUpdateCart: () => void }) => {
    const { handleUpdateCart } = props
    return <>
        <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="continue__btn">
                    <Link to='/shop'>Continue Shopping</Link>
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="continue__btn update__btn">
                    <BlackButton handleClick={handleUpdateCart} >
                        <><i className="fa fa-spinner" /> Update cart</>
                    </BlackButton>
                </div>
            </div>
        </div>
    </>
}