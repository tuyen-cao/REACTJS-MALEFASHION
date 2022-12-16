import Breadcrumbs from 'components/Breadcrumbs'
import Checkout from 'pages/Checkout'
import Completion from 'pages/Completion'
import Homepage from 'pages/Homepage'
import Notfound from 'pages/Notfound'
import Payment from 'pages/Payment'
import Shop from 'pages/Shop'
import ShopIndex from 'pages/ShopIndex'
import ShoppingCart from 'pages/ShoppingCart'
import { Route, Routes } from 'react-router-dom'

const PageRouters: React.FC = () => {
  return <>
    <Routes>
      <Route index element={<Homepage />}></Route>
      <Route path='home' element={<Homepage />}></Route>
      <Route path='shop' element={ <><Breadcrumbs /><ShopIndex /></>}  >
        <Route index element={<Shop  />}></Route>
        <Route path='shopping-cart' element={<ShoppingCart />} ></Route>
        <Route path='checkout' element={<Checkout />}></Route>
        <Route path='payment' element={<Payment />}></Route>
        <Route path='completion' element={<Completion />}></Route>
      </Route>
      <Route path='*' element={<Notfound />}></Route>
    </Routes>
  </>
}

export default PageRouters 