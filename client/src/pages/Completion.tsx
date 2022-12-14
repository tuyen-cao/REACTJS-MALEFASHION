import PagePreloder from 'components/PagePreloder';
import { useProductsInCartData, useUpdatePaymentStatusData } from 'hooks/useProductsInCartData';
import { useUrlIdParams } from 'hooks/useUrlIdParams';
import { BasketItem, Product, ProductHasQuantity } from 'models/types';
import React, { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch } from 'react-redux';
import { addPromo } from 'reducers/paymentReducer';
import { resetCart } from 'reducers/productsReducer';
import { ErrorFallback, myErrorHandler } from 'utilities/errorBoundaryUtils';


const Completion: React.FC = () => {
  const dispatch = useDispatch()
  let localStoragepayment = localStorage.getItem("payment");
  const storedpayment = localStoragepayment ? JSON.parse(localStoragepayment) : [];

  const productInCart: BasketItem[] = storedpayment.products

  const { isLoading,
    data: productsInCart, } = useProductsInCartData(useUrlIdParams(productInCart))

  const products = productInCart?.map(p1 => ({ ...p1, ...productsInCart?.find((p2: Product) => p2.id === p1.id) }))

  const mutateUpdatePaymentStatus = useUpdatePaymentStatusData()

  useEffect(() => {
    dispatch(resetCart())
    dispatch(addPromo(0))
    let localStorageOrder = localStorage.getItem("orderID");
    const storedorder = localStorageOrder ? JSON.parse(localStorageOrder) : null;

    mutateUpdatePaymentStatus.mutate({
      "id": storedorder.id,
      "paymentStatus": storedpayment.message
    })
    return (() => {
      localStorage.removeItem("payment")
      localStorage.removeItem("productsInCart")
      localStorage.removeItem("orderID")
    })
  }, [])
  if (isLoading) return <>
    <PagePreloder />
  </>
  return (<>
    {localStoragepayment !== null
      ?
      <section className="checkout spad">
        <div className="container">
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={myErrorHandler}>
            <><h2>Thank you for your order! </h2>
              <p>We have received your order with details below.</p>
              <div>

                <div className="checkout__order">
                  <h4 className="order__title">ORDER INFO<br />
                    ORDER NO.2530080002211201317-4885945</h4>
                  {productsInCart && <>
                    <ul className="checkout-order__total-products">
                      <li>
                        <span>NO</span>
                        <span>PRODUCT NAME </span><span>QTY</span>
                        <span>PRICE</span>
                      </li>
                      {products.map((p: ProductHasQuantity, index: number) => {
                        let formattedNumber = (index + 1).toLocaleString('en-US', {
                          minimumIntegerDigits: 2,
                          useGrouping: false
                        })
                        return <>
                          <li key={"product-ordered-" + p.id}>
                            <span>{formattedNumber}.</span>
                            <span>{p.title} </span><span>({p.quantity})</span>
                            <span>$ {(p.quantity * p.price).toFixed(2)}</span>
                          </li>
                        </>
                      })}
                    </ul>
                  </>
                  }
                </div>
                <div>SHIPPING FEE 0 <br />
                  {storedpayment.discount > 0 && <>Discount {storedpayment.discount}%</>}<br />
                  TOTAL {(products?.reduce((preValue: number, product) => preValue + product.quantity * product.price, 0)
                    * (1 - storedpayment.discount / 100)).toFixed(2)} <br />
                </div>
                <div>BILLED TO<br />
                  {storedpayment.billingInfo.firstName + storedpayment.billingInfo.lastName}<br />
                  {storedpayment.billingInfo.address}
                </div>

              </div></>
          </ErrorBoundary>
        </div>
      </section>
      : null}
  </>
  )
}

export default Completion