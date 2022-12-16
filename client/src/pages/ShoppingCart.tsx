import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {useMemo, useState } from 'react';
import { useTypedSelector } from 'store';
import { selectedProducts, updateCart } from 'reducers/productsReducer';
import { getPromo } from 'reducers/paymentReducer';
import PromoCode from 'components/PromoCode';
import ShoppingCartTable from 'components/ShoppingCartTable';
import CartTotal from 'components/utilities/CartTotal';

const ShoppingCart = () => {
    const dispatch = useDispatch()
    const productInCart = useTypedSelector(selectedProducts);
    const discount = useTypedSelector(getPromo);

    const [subTotal, setSubTotal] = useState(0)

    const calculateDiscount = useMemo(() => {
        return subTotal * discount / 100
    }, [discount, subTotal])

    const calculateTotal = useMemo(() => {
        return subTotal - calculateDiscount
    }, [subTotal, calculateDiscount])


    return (
        <>
            {/* Shopping Cart Section Begin */}
            <section className="shopping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <ShoppingCartTable />
                        </div>
                        <div className="col-lg-4">
                            {discount === 0 ? <PromoCode /> : null}
                            <div className="cart__total">
                                <h6>Cart total</h6>
                                <CartTotal />
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

