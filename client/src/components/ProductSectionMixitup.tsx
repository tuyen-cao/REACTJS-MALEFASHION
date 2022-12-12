
import { useQuery, useQueryClient } from 'react-query'
import PagePreloder from "./PagePreloder"
import { useDispatch } from 'react-redux'
import { addToCart } from 'reducers/productsReducer'
import ProductItem from './utilities/ProductItem'
import { useCallback } from 'react';
import { request } from 'utilities/axios-utils'
import mixitup from 'mixitup';

const ProductSectionMixitup = () => {
    const dispatch = useDispatch()

    const handleAddToCart = useCallback((productId: number) => {
        dispatch(addToCart({ id: productId, quantity: 1 }));
    }, [])
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

    if (isLoading) return <>
        <PagePreloder />
    </>

    const handleAddWishlist = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        console.log("add to wishlist")
    }

    // The `Api` class is not part of MixItUp and has been created to mock
    // the asyncronous fetching of data for this demo. To use it, we must
    // create an api instance, passing in our mock data to represent the
    // contents of a DB.

    //var api = new Api(items);

    // As we'll be building and binding our own UI, we'll start with caching
    // references to any DOM elements we'll need to work with

    var controls = document.querySelector('[data-ref="controls"]');
    var filters = document.querySelectorAll('[data-ref="filter"]');
    var container = document.querySelector('[data-ref="container"]');

    // "Gap" elements are used to maintain even columns in a justified grid. See our
    // "MixItUp Grid Layouts" tutorial for more information.

    var firstGap = document.querySelector('[data-ref="first-gap"]');

    // We'll need to keep track of our active current filter so
    // that we can sort within the current filter.

    var activeColor = '';

    // Instantiate and configure the mixer

    /* var mixer = mixitup(container, {
        selectors: {
            target: '[data-ref="item"]' // Query targets with an attribute selector to keep our JS and styling classes seperate
        },
        layout: {
            siblingAfter: firstGap // Ensure the first "gap" element is known to mixitup incase of insertion into an empty container
        },
        load: {
            dataset: data // As we have pre-rendered targets, we must "prime" MixItUp with their underlying data
        },
        data: {
            uidKey: 'id' // Our data model must have a unique id. In this case, its key is 'id'
        },
        render: { // We must provide a target render function incase we need to render new items not in the initial dataset (not used in this demo)
            target: function (item:any) {
                return '<div class="item ' + item.color + '" data-ref="item"><time class="published-date">' + item.publishedDate + '</time></div>';
            }
        }
    }); */

    /**
     * A helper function to set an active styling class on an active button,
     * and remove it from its siblings at the same time.
     *
     * @param {HTMLElement} activeButton
     * @param {HTMLELement[]} siblings
     * @return {void}
     */

    function activateButton(activeButton: any, siblings: any) {
        var button;
        var i;
console.log(activeButton)
        for (i = 0; i < siblings.length; i++) {
            button = siblings[i];

            button.classList[button === activeButton ? 'add' : 'remove']('control-active');
        }
    }

    /**
     * A click handler to detect the type of button clicked, read off the
     * relevent attributes, call the API, and trigger a dataset operation.
     *
     * @param   {HTMLElement} button
     * @return  {void}
     */

    function handleButtonClick(button: any) {
        // Define default values for color, sortBy and order
        // incase they are not present in the clicked button

        var color = activeColor;
        var sortBy = 'id';
        var order = 'asc';

        // If button is already active, or an operation is in progress, ignore the click

        // if (button.classList.contains('control-active') || mixer.isMixing()) return;

        // Else, check what type of button it is, if any

        if (button.matches('[data-ref="filter"]')) {
            // Filter button
//console.log(button)
            activateButton(button, filters);

            color = activeColor = button.getAttribute('data-color');
        } else {
            // Not a button

            return;
        }

        // Now that we have our color filter and sorting order, we can fetch some data from the API.

        /*   api.get({
              color: color,
              $sort_by: sortBy,
              $order: order
          })
              .then(function (items) {
                  // Our api returns an array of items which we can send
                  // straight to our mixer using the .dataset() method
  
                  return mixer.dataset(items);
              })
              .then(function (state) {
                  console.log('fetched ' + state.activeDataset.length + ' items');
              })
              .catch(console.error.bind(console)); */
    }

    // We can now set up a handler to listen for "click" events on our UI buttons

    controls?.addEventListener('click', function (e) {
        handleButtonClick(e.target);
        e.preventDefault()
    });

    // Set controls the active controls on startup to match the default filter and sort

    activateButton(controls?.querySelector('[data-color="all"]'), filters);

    // NB: Always remember to destroy the instance with mixer.destroy() when your
    // component unmounts to ensure that event handlers are unbound and the
    // instance can be garbage collected.

    return (
        <>
            {/* Product Section Begin */}
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <ul className="filter__controls" data-ref="controls">
                                <li className="active" data-filter="*" >
                                    <button type="button"
                                        className="control control-filter" data-ref="filter" data-color="all">Best Sellers</button>
                                </li>
                                <li data-filter=".new-arrivals">
                                    <button type="button"
                                        className="control control-filter" data-ref="filter" data-color="all">New Arrivals</button></li>
                                <li data-filter=".hot-sales"><button type="button"
                                    className="control control-filter" data-ref="filter" data-color="all">Hot Sales</button></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row product__filter" data-ref="container">
                        {data?.map((product: any) => {
                            return <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix">

                                <ProductItem
                                    key={"product-" + product.id}
                                    product={product}
                                    handleAddToCart={handleAddToCart}
                                    handleAddWishlist={handleAddWishlist} /></div>
                        })
                        }
                    </div>
                </div>
            </section>
            {/* Product Section End */}
        </>
    )
}

export default ProductSectionMixitup
