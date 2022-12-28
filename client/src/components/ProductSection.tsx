
import { useQuery } from 'react-query'
import PagePreloder from "./PagePreloder"
import { useDispatch } from 'react-redux'
import { addToCart } from 'reducers/productsReducer'
import ProductItem from './utilities/ProductItem'
import { fetchProduct } from 'services/product.service'
import { useCallback } from 'react';
import { URLPARAMS } from 'constants/product.constant'
import { Product } from 'models/types'

const ProductSection: React.FC = () => {
    const dispatch = useDispatch()

    const handleAddToCart = useCallback((productId: number) => {
        dispatch(addToCart({ id: productId, quantity: 1 }));
    }, [])

    const { isLoading, data } = useQuery(
        ['products'],
        () => fetchProduct(URLPARAMS.ALLPRODUCTTYPES),
        {
            select: (data) => {
                const newProducts = data.data.map((product: Product) => {
                    return { ...product, type: product.type }
                })
                return newProducts
            }
        }
    )
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
                    <div className="row product__filter" >
                        {data?.map((product: Product) => {
                            return <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix">

                                <ProductItem
                                    key={"product-" + product.id}
                                    product={product}
                                    handleAddToCart={handleAddToCart}
                                    handleAddWishlist={handleAddWishlist} /></div>
                        })}
                    </div>
                </div>
            </section>
            {/* Product Section End */}
        </>
    )
}

export default ProductSection
