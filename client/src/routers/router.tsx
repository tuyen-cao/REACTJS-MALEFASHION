import {
    createBrowserRouter, Navigate
} from "react-router-dom"

import Homepage from '../pages/Homepage'
import Shop from '../pages/Shop'
import ShoppingCart from '../pages/ShoppingCart'
import Notfound from '../pages/Notfound'
import Layout from "../Layout"
import Checkout from "../pages/Checkout"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Homepage />,
            },
            {
                path: "home",
                element: <Homepage />,
            },
            {
                path: "shop",
                element: <Shop />,
                children: [{
                    path: "checkout",
                    element: <Checkout />,
                },]
            },
            {
                path: "shopping-cart",
                element: <ShoppingCart />,
            },
            {
                path: "checkout",
                element: <Checkout />,
            },
            {
                path: "*",
                element: <Notfound />,
            },
        ]
    },
]);

export default router