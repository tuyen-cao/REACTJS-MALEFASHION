
import { QueryClient, useQuery, useQueryClient } from 'react-query'
import PagePreloder from "./PagePreloder"
import { useDispatch } from 'react-redux'
import { addToCart } from 'reducers/productsReducer'
import ProductItem from './utilities/ProductItem'
import { GetProduct } from 'services/product.service'
import { useCallback, useEffect, useState } from 'react';
import { ReactMixitup } from 'react-mixitup';
import { request } from 'utilities/axios-utils'
import styled from 'styled-components'


const ProductSectionMixup = () => {
    const dispatch = useDispatch()
    /****Start MIXUP**** */
    const [productKeys, setProductKeys] = useState([]);

    const TRANSITION_DURATION = 250;
    /****End MIXUP**** */

    const handleAddToCart = useCallback((productId: number) => {
        dispatch(addToCart({ id: productId, quantity: 1 }));
    }, [])

    const handleAddWishlist = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        console.log("add to wishlist")
    }

    const shuffleArray = ((array: any) => {
        array.map((item: any, i: number) => {
            const j = Math.floor(Math.random() * (i + 1));
            array[i] = array[j];
            array[j] = item;
        })
        return array
    })

    const queryClient = useQueryClient()
    const { isLoading, data, error } = useQuery(
        'products',
        () => {
            return request({ url: '/products?_expand=productType&productTypeId_ne=0&_limit=8' })
        },
        {
            select: (data) => {
                const newProducts = data?.data?.map((product: any) => {
                    return { ...product, type: product.productType.type }
                })
                return newProducts
            }
            ,
            onSuccess: () => {
                console.log("onSuccess")
            },
            onError: (_error) => {
                console.log(_error)
            },
            initialData: () => {
                const products = queryClient.getQueriesData('products')
                if (products) return products
                else return undefined
            }
        }
    )

    const _shuffle = () => {
        setProductKeys(shuffleArray(data?.map((product: any) => product.id)))
    };
   
    if (isLoading) return <>
        <PagePreloder />
    </>

    return (
        <>
            {/* Product Section Begin */}
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <ul className="filter__controls">
                                <li className="active" data-filter="*">
                                    <button onClick={_shuffle}> Best Sellers</button>
                                </li>
                                <li data-filter=".new-arrivals"><button onClick={_shuffle}> New Arrivals</button></li>
                                <li data-filter=".hot-sales"><button onClick={_shuffle}> Hot Sales</button></li>
                            </ul>
                        </div>
                    </div>
                    <div className=" product__filter" >
                        <ReactMixitupStyled
                            keys={productKeys}
                            // dynamicDirection is off because keys.length never changes
                            dynamicDirection="vertical"
                            transitionDuration={TRANSITION_DURATION}
                            renderCell={(key, style, ref) => {
                                let dir = Object.fromEntries(data?.map((product: any) => [product.id, product]));
                                const product = dir[key];

                                return (<>
                                    <div className='col-lg-3 col-md-6 col-sm-6' key={key}
                                        ref={ref}
                                        style={{
                                            // You must set the transition property here!
                                            transition: 'transform 300ms linear',
                                            ...style
                                        }}>
                                        <ProductItem
                                            key={"product-" + key}
                                            product={product}
                                            handleAddToCart={handleAddToCart}
                                            handleAddWishlist={handleAddWishlist} />
                                    </div>
                                </>

                                );
                            }}
                            renderWrapper={(style, ref, children) => {

                                return (
                                    <div
                                        style={{
                                            ...style
                                        }}
                                        ref={ref}
                                        className='row'
                                    >
                                        {children}
                                    </div>
                                );
                            }}
                        />
                    </div>
                </div>
            </section>
            {/* Product Section End */}

        </>
    )
}

export default ProductSectionMixup
const ReactMixitupStyled = styled(ReactMixitup)`
    border: 1px solid red;
    background: red;
`;