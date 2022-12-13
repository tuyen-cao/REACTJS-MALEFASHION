import PromoCode from 'components/PromoCode'
import { useFormik } from 'formik'
import WithQuestionLink from 'hocs/withQuestionLink'
import React, { useRef, useState, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { getPromo, setBillingInfo, getBillingInfo } from 'reducers/paymentReducer'
import { useTypedSelector } from 'store';
import { ErrorFallback, myErrorHandler } from 'utilities/error-boundary-utils'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'

import { FocusError } from 'focus-formik-error'
import { useDispatch } from 'react-redux'

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalScriptOptions } from "@paypal/paypal-js/types/script-options";

import PaypalButton from 'components/PaypalButton'
import { useCreateOrderData, useProductsInCartData } from 'hooks/useProductsInCartData'
import { useUrlIdParams } from 'hooks/useUrlIdParams'
import { selectedProducts } from 'reducers/productsReducer'
import { PAYMENTMETHODS } from 'constants/card.constatnt'


const currency = "USD";
const PromoCodeQuestionLink = WithQuestionLink(PromoCode);

const Checkout = () => {
    const discount = useTypedSelector(getPromo);
    const billingInfo = useTypedSelector(getBillingInfo);

    const productInCart = useTypedSelector(selectedProducts);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [enablePayPalButton, setEnablePayPalButton] = useState(false)
    const [orderInfo, setOrder] = useState({})

    const formikinitialValues = {
        firstName: '',
        lastName: '',
        country: '',
        email: '',
        address: '',
        addressapartment: '',
        city: '',
        state: '',
        zipcpde: '',
        phone: '',
        acc: false,
        diffAcc: false,
        password: '',
        orderNote: '',

    }
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('This field is required.'),
        lastName: Yup.string().required('This field is required.'),
        country: Yup.string().required('This field is required.'),
        email: Yup.string().email().required('This field is required.'),
        address: Yup.string().required('This field is required.'),
        city: Yup.string().required('This field is required.'),
        state: Yup.string().required('This field is required.'),
        zipcpde: Yup.string()
            .required('This field is required.')
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(5, "Must be exactly 5 digits")
            .max(5, "Must be exactly 5 digits"),
        phone: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('This field is required.'),
        password: Yup.string().when('acc', {
            is: true,
            then: Yup.string().required('This field is required.')
        }),
        orderNote: Yup.string().when('diffAcc', {
            is: true,
            then: Yup.string().required('This field is required.')
        }),
    });
    const refBillingDetail = useRef(null)
    const formik = useFormik({
        initialValues: formikinitialValues,
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            dispatch(setBillingInfo({ ...values }))
        },
    });
    const formikPaymentMethod = useFormik({
        initialValues: {
            paymentmethod: ''
        },
        validationSchema: Yup.object().shape({
            paymentmethod: Yup.string().required('This field is required.'),
        }),
        onSubmit: (values: any) => {
            dispatch(setBillingInfo({ ...values }))
        },
    })
    const { isLoading,
        data: productsInCart, } = useProductsInCartData(useUrlIdParams(productInCart))

    const mutateOrderData = useCreateOrderData()

    const handleCheckout = () => {
        formik.handleSubmit()
        formikPaymentMethod.handleSubmit()

        formik.isValid
            && formikPaymentMethod.isValid
            && formikPaymentMethod.values.paymentmethod === PAYMENTMETHODS.CREDIT_CARD && navigate("../payment")

    }
    useEffect(() => {
        setOrder({
            "products": productInCart.map(p => {
                return { "productId": p.id }
            }),
            "total": Number(calculateSubTotal().toFixed(2)),
            "discountedTotal": Number((calculateSubTotal() * discount / 100).toFixed(2)),
            "totalQuantity": Number(products?.reduce((preValue: number, product) => preValue + product.quantity, 0))
        })
    }, [discount, productInCart])
    useEffect(() => {
        if (formik.isValid && formikPaymentMethod.isValid && formik.dirty && formikPaymentMethod.dirty) {
            mutateOrderData.mutate(orderInfo)
        }

        if (formik.isValid && formik.dirty && formikPaymentMethod.values.paymentmethod === PAYMENTMETHODS.PAYPAL)
            setEnablePayPalButton(true)
        if (formikPaymentMethod.values.paymentmethod === PAYMENTMETHODS.CREDIT_CARD)
            setEnablePayPalButton(false)
    }, [formikPaymentMethod.values.paymentmethod, formik.isValid])

    const paypalScriptOptions: PayPalScriptOptions = {
        "client-id":
            "Aa7kWhlwBYR9iBqqv7dBvyudFgkMCQA31wTwpwGjDf-U30efKwIzTHThRwK1hn3iZMHbScoprOIj76SJ",
        currency: "USD",
        "disable-funding": "credit,card"
    };

    const products = productInCart?.map(p1 => ({ ...p1, ...productsInCart?.find((p2: any) => p2.id === p1.id) }))

    const calculateSubTotal = () => {
        if (Number(products?.reduce((preValue: number, product) => preValue + product.quantity * product.price, 0)) > 0) {
            return Number(products?.reduce((preValue: number, product) => preValue + product.quantity * product.price, 0))
        } return 0
    }
    const calculateTotal = () => {
        return Number(calculateSubTotal() * (1 - discount / 100))
    }

    return (
        <>
            {/* Checkout Section Begin */}
            <section className="checkout spad">
                <div className="container">
                    <div className="checkout__form">
                        <div className="row">
                            <div className="col-lg-8 col-md-6" >
                                {discount === 0 &&
                                    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
                                        <PromoCodeQuestionLink />
                                    </ErrorBoundary>
                                }
                                <form name="frmCheckout" ref={refBillingDetail} className="was-validated">
                                    <FocusError formik={formik} />
                                    <h6 className="checkout__title">Billing Details</h6>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <label>
                                                    Fist Name<span>*</span>
                                                </label>
                                                <input type="text"
                                                    placeholder="First Name"
                                                    required
                                                    name="firstName"
                                                    value={formik.values.firstName}

                                                    onChange={formik.handleChange} />
                                                {formik.errors.firstName && formik.touched.firstName && (
                                                    <div className='invalid-feedback'>{formik.errors.firstName}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <label>
                                                    Last Name<span>*</span>
                                                </label>
                                                <input type="text"
                                                    placeholder="Last Name"
                                                    required
                                                    name="lastName"
                                                    value={formik.values.lastName}

                                                    onChange={formik.handleChange} />
                                                {formik.errors.lastName && formik.touched.lastName && (
                                                    <div className='invalid-feedback'>{formik.errors.lastName}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="checkout__input">
                                        <label>
                                            Country<span>*</span>
                                        </label>
                                        <input type="text"
                                            placeholder="Country"
                                            required
                                            name="country"
                                            value={formik.values.country}

                                            onChange={formik.handleChange} />
                                        {formik.errors.country && formik.touched.country && (
                                            <div className='invalid-feedback'>{formik.errors.country}</div>
                                        )}

                                    </div>
                                    <div className="checkout__input">
                                        <label>
                                            Street Address<span>*</span>
                                        </label>
                                        <input type="text"
                                            placeholder="Street Address"
                                            required
                                            name="address"
                                            value={formik.values.address}

                                            onChange={formik.handleChange} />
                                        {formik.errors.address && formik.touched.address && (
                                            <div className='invalid-feedback'>{formik.errors.address}</div>
                                        )}
                                        <input type="text"
                                            placeholder="Apartment, suite, unite ect (optinal)"
                                            required
                                            name="addressapartment"
                                            value={formik.values.addressapartment}

                                            onChange={formik.handleChange} />

                                    </div>
                                    <div className="checkout__input">
                                        <label>
                                            Town/City<span>*</span>
                                        </label>
                                        <input type="text"
                                            placeholder="Town/City"
                                            required
                                            name="city"
                                            value={formik.values.city}

                                            onChange={formik.handleChange} />
                                        {formik.errors.city && formik.touched.city && (
                                            <div className='invalid-feedback'>{formik.errors.city}</div>
                                        )}
                                    </div>
                                    <div className="checkout__input">
                                        <label>
                                            Country/State<span>*</span>
                                        </label>
                                        <input type="text"
                                            placeholder="Country/State"
                                            required
                                            name="state"
                                            value={formik.values.state}

                                            onChange={formik.handleChange} />
                                        {formik.errors.state && formik.touched.state && (
                                            <div className='invalid-feedback'>{formik.errors.state}</div>
                                        )}
                                    </div>
                                    <div className="checkout__input">
                                        <label>
                                            Postcode / ZIP<span>*</span>
                                        </label>
                                        <input type="text"
                                            placeholder="Postcode / ZIP"
                                            required
                                            name="zipcpde"
                                            value={formik.values.zipcpde}

                                            onChange={formik.handleChange} />
                                        {formik.errors.zipcpde && formik.touched.zipcpde && (
                                            <div className='invalid-feedback'>{formik.errors.zipcpde}</div>
                                        )}

                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <label>
                                                    Phone<span>*</span>
                                                </label>
                                                <input type="text"
                                                    placeholder="Phone"
                                                    required
                                                    name="phone"
                                                    value={formik.values.phone}

                                                    onChange={formik.handleChange} />
                                                {formik.errors.phone && formik.touched.phone && (
                                                    <div className='invalid-feedback'>{formik.errors.phone}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <label>
                                                    Email<span>*</span>
                                                </label>
                                                <input type="email"
                                                    placeholder="Email"
                                                    required
                                                    name="email"
                                                    value={formik.values.email}

                                                    onChange={formik.handleChange} />
                                                {formik.errors.email && formik.touched.email && (
                                                    <div className='invalid-feedback'>{formik.errors.email}</div>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="checkout__input-checkbox">
                                        <label>Create an account?
                                            <input
                                                name="acc"
                                                type="checkbox"
                                                checked={formik.values.acc}
                                                onChange={formik.handleChange} />
                                            <span className="checkmark"></span></label>
                                        <p>
                                            Create an account by entering the information below. If you
                                            are a returning customer please login at the top of the page
                                        </p>
                                    </div>
                                    {formik.values.acc
                                        ?
                                        <div className="checkout__input">
                                            <label>
                                                Account Password<span>*</span>
                                            </label>
                                            <input type="password"
                                                placeholder="Account Password"
                                                required
                                                name="password"
                                                value={formik.values.password}

                                                onChange={formik.handleChange} />
                                            {formik.errors.password && formik.touched.password && (
                                                <div className='invalid-feedback'>{formik.errors.password}</div>
                                            )}

                                        </div>
                                        : null
                                    }

                                    <div className="checkout__input-checkbox">
                                        <label>Note about your order, e.g, special noe for delivery
                                            <input
                                                name="diffAcc"
                                                type="checkbox"
                                                checked={formik.values.diffAcc}
                                                onChange={formik.handleChange} />
                                            <span className="checkmark"></span></label>
                                    </div>
                                    {formik.values.diffAcc
                                        ? <div className="checkout__input">
                                            <label>
                                                Order notes<span>*</span>
                                            </label>
                                            <input type="text"
                                                placeholder="Notes about your order, e.g. special notes for delivery."
                                                required
                                                name="orderNote"
                                                value={formik.values.orderNote}

                                                onChange={formik.handleChange} />
                                            {formik.errors.orderNote && formik.touched.orderNote && (
                                                <div className='invalid-feedback'>{formik.errors.orderNote}</div>
                                            )}

                                        </div>
                                        : null
                                    }
                                </form>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="checkout__order">
                                    <h4 className="order__title">Your order</h4>
                                    <div className="checkout-order__products">
                                        Product <span>Total</span>
                                    </div>

                                    {productsInCart &&
                                        <ul className="checkout-order__total-products">
                                            {products.map((p: any, index: number) => {
                                                let formattedNumber = (index + 1).toLocaleString('en-US', {
                                                    minimumIntegerDigits: 2,
                                                    useGrouping: false
                                                })
                                                return <>
                                                    <li key={"product-ordered-" + p.id}>
                                                        <span>{formattedNumber}.</span>
                                                        <span>{p.title} <strong>({p.quantity})</strong></span>
                                                        <span>$ {(p.quantity * p.price).toFixed(2)}</span>
                                                    </li>
                                                </>
                                            })}

                                        </ul>
                                    }

                                    <ul className="checkout-order__total-all">
                                        <li>
                                            Subtotal <span>$ {calculateSubTotal().toFixed(2)} </span>
                                        </li>
                                        <li>
                                            Total {discount > 0 && `(Discount  ${discount} %)`}
                                            <span>$ {calculateTotal().toFixed(2)}</span>
                                        </li>
                                    </ul>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adip elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                    <form name="frmPaymentMethod" className="was-validated">
                                        <div className="checkout__input-checkbox">
                                            <label>Credit Card
                                                <input
                                                    name="paymentmethod"
                                                    type="radio"
                                                    required
                                                    id='paymentmethodCredit'
                                                    value="Credit card"
                                                    onChange={formikPaymentMethod.handleChange} />
                                                <span className="checkmark"></span></label>
                                        </div>
                                        <div className="checkout__input-checkbox">
                                            <label>Paypal
                                                <input
                                                    name="paymentmethod"
                                                    type="radio"
                                                    required
                                                    id='paymentmethodPaypal'
                                                    value="Paypal"
                                                    onChange={formikPaymentMethod.handleChange} />
                                                <span className="checkmark"></span></label>
                                        </div>
                                        {formikPaymentMethod.errors.paymentmethod && formikPaymentMethod.errors.paymentmethod && (
                                            <div className='invalid-feedback'>{formikPaymentMethod.errors.paymentmethod}</div>
                                        )}
                                    </form>

                                    {enablePayPalButton ? <>
                                        <PayPalScriptProvider
                                            options={paypalScriptOptions}
                                        >
                                            <PaypalButton
                                                currency={currency}
                                                showSpinner={false}
                                                handleClick={() => {

                                                    localStorage.setItem("payment", JSON.stringify({ products, discount, billingInfo }))
                                                    navigate("../completion")

                                                }}
                                            />
                                        </PayPalScriptProvider>
                                    </> : <button type="submit" className="site-btn" onClick={handleCheckout}>

                                        <>PLACE ORDER</>
                                    </button>}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>
            {/* Checkout Section End */}
        </>

    )
}

export default Checkout