
import { useQuery } from 'react-query'
import PagePreloder from "./PagePreloder"
import { useDispatch } from 'react-redux'
import { addToCart } from 'reducers/productsReducer'
import ProductItem from './utilities/ProductItem'
import { GetProduct } from 'services/product.service'
import { useCallback } from 'react';

const ProductSection = () => {
    const dispatch = useDispatch()

    const handleAddToCart = useCallback((productId: number) => {
        dispatch(addToCart({ id: productId, quantity: 1 }));
    },[])

    const { isLoading, data } = GetProduct()

    if (isLoading) return <>
        <PagePreloder />
    </>

    const handleAddWishlist = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        console.log("add to wishlist")
    }

    return (
        <>
            {/* Product Section Begin */}
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <ul className="filter__controls">
                                <li className="active" data-filter="*">
                                    Best Sellers
                                </li>
                                <li data-filter=".new-arrivals">New Arrivals</li>
                                <li data-filter=".hot-sales">Hot Sales</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row product__filter" >
                        {data?.map((product: any) => {
                            return <ProductItem
                                key={"product-" + product.id}
                                product={product}
                                handleAddToCart={handleAddToCart}
                                handleAddWishlist={handleAddWishlist} />
                        })}
                    </div>
                </div>
            </section>
            {/* Product Section End */}
        </>
    )
}

export default ProductSection
