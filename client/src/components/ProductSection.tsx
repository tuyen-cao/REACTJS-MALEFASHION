
import { useQuery } from 'react-query'
import PagePreloder from "./PagePreloder"
import { useDispatch } from 'react-redux'
import { addToCart } from 'reducers/productsReducer'
import ProductItem from './utilities/ProductItem'
import { fetchProduct } from 'services/product.service'
import { useCallback, useState } from 'react';
import { URLPARAMS } from 'constants/product.constant'
import { Product } from 'models/types'

const ProductSection: React.FC = () => {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const handleAddToCart = useCallback((productId: number) => {
        dispatch(addToCart({ id: productId, quantity: 1 }));
    }, [])

    const { isLoading, data } = useQuery(
        ['products', page],
        () => fetchProduct(URLPARAMS.PRODUCTFILTER + `_page=${page}`),
        {
            keepPreviousData : true,
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
            <div className="row" >
                {data?.map((product: Product) => {
                    return <div className="col-lg-4 col-md-6 col-sm-6">
                        <ProductItem
                            key={"product-" + product.id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                            handleAddWishlist={handleAddWishlist} /></div>
                })}
            </div>
        </>
    )
}

export default ProductSection
