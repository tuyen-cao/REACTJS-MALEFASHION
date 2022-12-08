import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary'
import { useTypedSelector } from 'store';
import { selectedProducts, updateCart } from 'reducers/productsReducer';
import { getPromo } from 'reducers/paymentReducer';
import { useUrlIdParams } from 'hooks/useUrlIdParams';
import { useProductsInCartData } from 'hooks/useProductsInCartData';
import PagePreloder from 'components/PagePreloder';
import { ErrorFallback, myErrorHandler } from 'utilities/error-boundary-utils';
import ProductItemInCart from 'components/utilities/ProductItemInCart';
import PromoCode from 'components/PromoCode';

const ShoppingCart = () => {
    const dispatch = useDispatch()
    const productInCart = useTypedSelector(selectedProducts);
    const discount = useTypedSelector(getPromo);

    const [subTotal, setSubTotal] = useState(0)
    const [myCart, setCart] = useState(productInCart)

    const { isLoading,
        data: productsInCart,} = useProductsInCartData(useUrlIdParams(productInCart))

    const handleUpdateCart = () => {
        myCart.map((p) => dispatch(updateCart(p)))
    }

    const handleQuantityChange = (productId: number, value: number) => {
        const newArr = myCart.map(obj => {
            if (obj.id === productId) {
                return { ...obj, quantity: value };
            }
            return obj;
        });
        setCart(newArr)
        calculateSubTotal()
    }
    const calculateSubTotal = useCallback(() => {
        const products = productInCart?.map(p1 => ({ ...p1, ...productsInCart?.find((p2: any) => p2.id === p1.id) }))
        setSubTotal(products?.reduce((preValue: number, product) => preValue + product.quantity * product.price, 0))
    }, [productInCart, productsInCart])

    const calculateDiscount = useMemo(() => {
        return subTotal * discount / 100
    }, [discount, subTotal])

    const calculateTotal = useMemo(() => {
        return subTotal - calculateDiscount
    }, [ subTotal, calculateDiscount])

    useEffect(() => {
        setCart(productInCart)
        calculateSubTotal()
    }, [productInCart, calculateSubTotal])

    if (isLoading) return <>
        <PagePreloder />
    </>

    return (
        <>
            {/* Shopping Cart Section Begin */}
            <section className="shopping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
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
                        </div>
                        <div className="col-lg-4">
                            {discount === 0 ? <PromoCode /> : null}
                            <div className="cart__total">
                                <h6>Cart total</h6>
                                <ul>
                                    <li>
                                        Subtotal <span>$ {subTotal.toFixed(2)}</span>
                                    </li>
                                    {discount > 0 ? <>
                                        <li>
                                            Discount ({discount}%) <span>$ {calculateDiscount.toFixed(2)}</span>
                                        </li>
                                    </> : null}
                                    <li>
                                        Total <span>$ {calculateTotal.toFixed(2)}</span>
                                    </li>
                                </ul>
                                <Link to="../checkout" className="primary-btn">
                                    Proceed to checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Shopping Cart Section End */}
        </>
    )
}

export default ShoppingCart

