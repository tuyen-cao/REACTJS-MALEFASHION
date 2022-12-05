import React, { useEffect, useState, useCallback } from "react"

import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart, selectedProducts } from "reducers/productsReducer"
import { useTypedSelector } from "store"
import { useProductsInCartData } from "hooks/useProductsInCartData"
import { useUrlIdParams } from "hooks/useUrlIdParams"

function Header() {
    const dispatch = useDispatch()
    const [totalItems, setTotalItems] = useState(0)
    const [totalAmounts, setTotalAmounts] = useState(0)
    const productInCart = useTypedSelector(selectedProducts);
    const [urlParams, setUrlParams] = useState('')

    const getTotalItems = () => {
        let total = 0, params = '';
        productInCart.map((p: any) => {
            total += p.quantity
            params += `&id=${p.id}`
        })
        setTotalItems(total)
    }
    const { isLoading, data: productsInCart, isSuccess, error } = useProductsInCartData(useUrlIdParams(productInCart))

    const calculateTotalAmounts = () => {
        const prods = productsInCart?.map((p: any, i: number) => {
            const newPro = (({ id, price }) => ({ id, price }))(p)
            return { ...newPro, ...productInCart[i] }
        })
        let total = prods?.reduce(
            (preValue: number, prod: any) => preValue + prod.quantity * prod.price, 0)
        setTotalAmounts(total)
    }


    useEffect(() => {
        let localStorageProductsInCart = localStorage.getItem("productsInCart");
            let storedWishlists = typeof localStorageProductsInCart === "string"
                ? JSON.parse(localStorageProductsInCart) : [];
        if (productInCart.length === 0 && storedWishlists.length > 0) {
            storedWishlists.map((product: any) => {
                dispatch(addToCart(product))
            })
        }
    }, [])

    useEffect(() => {
        getTotalItems()
        calculateTotalAmounts()

    }, [isLoading, productsInCart, productInCart])
    return (
        <>

            {/* Offcanvas Menu Begin */}
            <div className="offcanvas-menu-overlay" />
            <div className="offcanvas-menu-wrapper">
                <div className="offcanvas__option">
                    <div className="offcanvas__links">
                        <a href="#">Sign in</a>
                        <a href="#">FAQs</a>
                    </div>
                    <div className="offcanvas__top__hover">
                        <span>
                            Usd <i className="arrow_carrot-down" />
                        </span>
                        <ul>
                            <li>USD</li>
                            <li>EUR</li>
                        </ul>
                    </div>
                </div>
                <div className="offcanvas__nav__option">
                    <a href="#" className="search-switch">
                        <img src="/img/icon/search.png" alt="" />
                    </a>
                    <a href="#">
                        <img src="/img/icon/heart.png" alt="" />
                    </a>
                    <Link to='shop/shopping-cart'>
                        <img src="/img/icon/cart.png" alt="" />
                        {totalItems > 0 ? <BadgeStyled className="badge rounded-pill bg-danger">{totalItems}</BadgeStyled> : null}

                    </Link>

                    <div className="price">{totalAmounts?.toFixed(2)}</div>
                </div>
                <div id="mobile-menu-wrap" />
                <div className="offcanvas__text">
                    <p>Free shipping, 30-day return or refund guarantee.</p>
                </div>
            </div>
            {/* Offcanvas Menu End */}
            {/* Header Section Begin */}
            <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-7">
                                <div className="header__top__left">
                                    <p>Free shipping, 30-day return or refund guarantee.</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-5">
                                <div className="header__top__right">
                                    <div className="header__top__links">
                                        <a href="#">Sign in</a>
                                        <a href="#">FAQs</a>
                                    </div>
                                    <div className="header__top__hover">
                                        <span>
                                            Usd <i className="arrow_carrot-down" />
                                        </span>
                                        <ul>
                                            <li>USD</li>
                                            <li>EUR</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3">
                            <div className="header__logo">
                                <a href="./index.html">
                                    <img src="/img/logo.png" alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <nav className="header__menu mobile-menu">
                                <ul>
                                    <li className="active">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="shop">Shop</Link>
                                    </li>
                                    <li>
                                        <a href="#">Pages</a>
                                        <ul className="dropdown">
                                            <li>
                                                <a href="./about.html">About Us</a>
                                            </li>
                                            <li>
                                                <a href="./shop-details.html">Shop Details</a>
                                            </li>
                                            <li>
                                                <a href="./shopping-cart.html">Shopping Cart</a>
                                            </li>
                                            <li>
                                                <a href="./checkout.html">Check Out</a>
                                            </li>
                                            <li>
                                                <a href="./blog-details.html">Blog Details</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="./blog.html">Blog</a>
                                    </li>
                                    <li>
                                        <a href="./contact.html">Contacts</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <div className="header__nav__option">
                                <a href="#" className="search-switch">
                                    <img src="/img/icon/search.png" alt="" />
                                </a>
                                <a href="#">
                                    <img src="/img/icon/heart.png" alt="" />
                                </a>
                                <Link to='shop/shopping-cart'>
                                    <img src="/img/icon/cart.png" alt="" />
                                    {totalItems > 0 ? <BadgeStyled className="badge rounded-pill bg-danger">{totalItems}</BadgeStyled> : null}

                                </Link>
                                <div className="price">{totalAmounts?.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="canvas__open">
                        <i className="fa fa-bars" />
                    </div>
                </div>
            </header>
            {/* Header Section End */}
        </>
    )
}

export default React.memo(Header)

const BadgeStyled = styled.span`
    color: #ffffff!important;
    border-radius: 10px;
    left: -5px;
    top: 15px!important;
`;
