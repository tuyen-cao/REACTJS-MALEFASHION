
import { useQuery } from 'react-query'
import PagePreloder from "./PagePreloder"
import { useDispatch } from 'react-redux'
import { addToCart } from 'reducers/productsReducer'
import ProductItem from './utilities/ProductItem'
import { GetProduct } from 'services/product.service'
import { useCallback, useEffect, useState } from 'react';
import { ReactMixitup } from 'react-mixitup';
import { range, shuffle } from 'lodash'

const ProductSection = () => {

    /****Start MIXUP**** */

    const NUM_CELLS = 100;
    const [keys, setKeys] = useState(() => range(NUM_CELLS));

    const _shuffle = () => {
        setKeys(shuffle(range(NUM_CELLS)));
        console.log(keys)
    };

    const TRANSITION_DURATION = 250;
    /****End MIXUP**** */

    const dispatch = useDispatch()

    const handleAddToCart = useCallback((productId: number) => {
        dispatch(addToCart({ id: productId, quantity: 1 }));
    }, [])

    const { isLoading, data } = GetProduct()

    if (isLoading) return <>
        <PagePreloder />
    </>

    const handleAddWishlist = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        console.log("add to wishlist")
    }

    const imageKeys = data.map((product: any) => product.id);
    const dir = Object.fromEntries(data.map((product: any) => [product.id, product]));
    
 
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
                        {/* {data?.map((product: any) => {
                            return <ProductItem
                                key={"product-" + product.id}
                                product={product}
                                handleAddToCart={handleAddToCart}
                                handleAddWishlist={handleAddWishlist} />
                        })} */}
                        <button onClick={_shuffle}>Shuffle</button>
                        
                        <ReactMixitup
                            keys={imageKeys}
                            // dynamicDirection is off because keys.length never changes
                            dynamicDirection="off"
                            transitionDuration={TRANSITION_DURATION}
                            renderCell={(key, style, ref) => {
                                const product = dir[key];
                                
                                return (<>
                                    {/* <img
                                        src={img.src}
                                        key={key}
                                        ref={ref}
                                        style={{
                                            // You must set the transition property here!
                                            transition: 'transform 300ms linear',
                                            ...style
                                        }}
                                    >
                                        {key}
                                    </img> */}
                                    <div className='col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix' key={key}
                                        ref={ref}
                                        style={{
                                            // You must set the transition property here!
                                            transition: 'transform 300ms linear',
                                            ...style
                                        }}>
                                        <ProductItem
                                            key={"product-" + key}
                                            product={ product}
                                            handleAddToCart={handleAddToCart}
                                            handleAddWishlist={handleAddWishlist} />
                                    </div>
                                </>

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

export default ProductSection
