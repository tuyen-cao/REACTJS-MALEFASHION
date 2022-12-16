
import { useQuery, useQueryClient } from 'react-query'
import PagePreloder from "./PagePreloder"
import { useDispatch } from 'react-redux'
import { addToCart } from 'reducers/productsReducer'
import ProductItem from './utilities/ProductItem'
import React, { useCallback, useEffect, useState } from 'react';
import mixitup from 'mixitup';
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback, myErrorHandler } from 'utilities/errorBoundaryUtils'
import { fetchProduct } from 'services/product.service'
import { URLPARAMS } from 'constants/product.constant'
import { ProductTypes } from 'models/types'

const ProductSectionMixitup = () => {
    const dispatch = useDispatch()
    const [productTypes, setProductType] = useState<string[]>([])
    const handleAddToCart = useCallback((productId: number) => {
        dispatch(addToCart({ id: productId, quantity: 1 }));
    }, [])
    const queryClient = useQueryClient()
    const { isLoading, data, error, isSuccess } = useQuery(
        'products',
        () => fetchProduct(URLPARAMS.ALLPRODUCTTYPESLIMITED),
        {
            select: (data) => {
                const newProducts = data?.data?.map((product: any) => {
                    return { ...product, type: product.productType.type }
                })
                return newProducts
            }
            ,
            onSuccess: (data) => {
                const uniqueIds: any[] = [];

                const unique = data?.filter((element: any) => {
                    const isDuplicate = uniqueIds.includes(element.productType.type);

                    if (!isDuplicate) {
                        uniqueIds.push(element.productType.type);

                        return element.productType.type;
                    }

                    return false;
                });

                setProductType(() => {
                    return unique.map((type: any) => type.productType.type)
                })
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

    const handleAddWishlist = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        console.log("add to wishlist")
    }

    let mixer: any;

    useEffect(() => {
        const myTimeout = setTimeout(() => {
            const containerEl = document.querySelector('.product__filter');
            mixer = mixitup(containerEl)
            const firstFilterSelector = document.querySelector('.filter__controls li') as HTMLElement | null;
            mixer.filter(firstFilterSelector?.dataset.filter)
        }, 100);
        return (() => {
            clearTimeout(myTimeout);
        })
    }, [isLoading, productTypes])



    if (isLoading) return <>
        <PagePreloder />
    </>
    return (
        <>
            {/* Product Section Begin */}
            <section className="product spad">
                <div className="container" data-ref="container">
                    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
                        <FilterControls productTypes={productTypes} />
                    </ErrorBoundary>
                    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
                        <div className="row product__filter" ><>
                            {data?.map((product: any) => {
                                return <>
                                    <div data-ref="item"
                                        className={`col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix 
                                     ${product.productType.type.replace(' ', '-')}`}>

                                        <ProductItem
                                            key={"product-" + product.id}
                                            product={product}
                                            handleAddToCart={handleAddToCart}
                                            handleAddWishlist={handleAddWishlist} /></div>
                                </>
                            })
                            }
                        </>
                        </div>
                    </ErrorBoundary>
                </div>
            </section>
            {/* Product Section End */}
        </>
    )
}

export default ProductSectionMixitup


const FilterControls = React.memo((props: { productTypes: string[] }) => {
    const { productTypes } = props
    return <>
        <div className="row">
            <div className="col-lg-12">
                {productTypes &&
                    <ul className="filter__controls" data-ref="controls">
                        {productTypes.map((type) => {
                            return <li data-filter={`.${type.replace(' ', '-')}`} data-ref="filter">{type}</li>
                        })}
                    </ul>
                }
            </div>
        </div>
    </>
})