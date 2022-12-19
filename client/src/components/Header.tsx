import React, { ReactEventHandler, useEffect } from "react"
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ShoppingCartLink from "./utilities/ShoppingCartLink"
import { useTypedSelector } from "store";
import { addToCart, selectedProducts } from "reducers/productsReducer";
import { useDispatch } from "react-redux";
import { BasketItem } from "models/types";

const Header: React.FC = () => {
    const dispatch = useDispatch()
    const productInCart = useTypedSelector(selectedProducts);
    useEffect(() => {
        const localStorageProductsInCart = localStorage.getItem("productsInCart");
        const storedProductsInCart = typeof localStorageProductsInCart === "string"
            ? JSON.parse(localStorageProductsInCart) : [];
        if (productInCart.length === 0 && storedProductsInCart.length > 0) {
            storedProductsInCart.map((product: BasketItem) => {
                dispatch(addToCart(product))
            })
        }
    }, [])
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
                    <SearchSwitch />
                    <a href="#">
                        <img src="/img/icon/heart.png" alt="" />
                    </a>
                    <ShoppingCartLink />
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
                                <div className="header-top__left">
                                    <p>Free shipping, 30-day return or refund guarantee.</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-5">
                                <div className="header-top__right">
                                    <div className="header-top__links">
                                        <a href="#">Sign in</a>
                                        <a href="#">FAQs</a>
                                    </div>
                                    <div className="header-top__hover">
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
                                <SearchSwitch />
                                <a href="#">
                                    <img src="/img/icon/heart.png" alt="" />
                                </a>

                                <ShoppingCartLink />
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


const SearchSwitch = () => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        document.getElementById('search-model')!.style.display = "block";
    }
    return (
        <>
            <button className="search-switch border-0 bg-transparent" onClick={handleClick}>
                <img src="/img/icon/search.png" alt="" />
            </button>
        </>
    )
}