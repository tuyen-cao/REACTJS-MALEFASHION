import PagePreloder from "components/PagePreloder"
import SearchForm from "components/SearchForm"
import NiceSelect from "components/utilities/NiceSelect"
import ProductItem from "components/utilities/ProductItem"
import { Product, ShowingFilterResult } from "models/types"

import { Accordion, Card } from "react-bootstrap"
import Pagination from 'react-bootstrap/Pagination'
import { ScrollContainer } from "react-nice-scroll"

import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { addToCart } from 'reducers/productsReducer'
import { fetchProduct } from 'services/product.service'
import { useCallback, useState, useEffect } from 'react';
import { NUMOFITEMPERPAGE, URLPARAMS } from 'constants/product.constant'
import ReactPaginate from 'react-paginate';


const Shop: React.FC = () => {
    const [page, setPage] = useState(1)
    const [rangePrice, setRangePrice] = useState("_sort=price&_price=asc")
    const { isLoading, data, isError, error, isPreviousData } = useQuery(
        ['products', { page, rangePrice }],
        () => fetchProduct(URLPARAMS.PRODUCTFILTER
            .replace('{limit}', NUMOFITEMPERPAGE.toString())
            .replace('{page}', page.toString())
            .replace('{range}', () => {
                console.log(rangePrice.toString())
                return rangePrice.toString()
            })),
        {
            keepPreviousData: true
        }
    )

    const handlePageChange = (value: number) => {
        setPage(value + 1)
    }

    const handleProductSort = (value: string) => {
        let range = ""
        console.log(value)
        if (value === "asc") {
            range = `_sort=price&_price=${value}`
        }
        else {

            range = "price_gte=" + value.replace("-", "&price_lte=")
        }
        setPage(1)
        setRangePrice(range)
    }
    if (isLoading) return <>
        <PagePreloder />
    </>
    if (isError)
        return <>Error: {error}</>


    return (
        <>
            {/* Shop Section Begin */}
            <section className="shop spad">
                <div className="container">
                    <div className="row">
                        <SideBar />
                        <div className="col-lg-9">
                            <ProductOption showingFilterResult={{
                                currentPage: page,
                                numOfItems: data?.data?.length === NUMOFITEMPERPAGE ? NUMOFITEMPERPAGE : data?.data?.length,
                                totalItems: data.headers['x-total-count']
                            }} onProductSort={handleProductSort} />
                            <ProductSection productList={data.data} />
                            {data.headers['x-total-count'] > NUMOFITEMPERPAGE &&
                                <PaginationBlock totalItems={data.headers['x-total-count']} onPageChange={handlePageChange} />}
                        </div>
                    </div>
                </div>
            </section>
            {/* Shop Section End */}
        </>
    )
}

export default Shop

const SideBarSearch: React.FC = () => {
    return <>
        <div className="shop__sidebar__search">
            <SearchForm
                hasSubmitBtn
                placeholder="Search..."
                handleSubmit={() => { console.log("submit") }} />
        </div>
    </>
}
const SideBarAccordion: React.FC = () => {
    return <>
        <div className="shop__sidebar__accordion">
            <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
                <CategoriesArccodion />
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Accordion Item #2</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {/*<div className="accordion" id="accordionExample">
                 <div className="card">
                    <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseOne">
                            Categories
                        </a>
                    </div>
                    <div
                        id="collapseOne"
                        className="collapse show"
                        data-parent="#accordionExample"
                    >
                        <div className="card-body">
                            <div className="shop__sidebar__categories">
                                <ul className="nice-scroll">
                                    <li>
                                        <a href="#">Men (20)</a>
                                    </li>
                                    <li>
                                        <a href="#">Women (20)</a>
                                    </li>
                                    <li>
                                        <a href="#">Bags (20)</a>
                                    </li>
                                    <li>
                                        <a href="#">Clothing (20)</a>
                                    </li>
                                    <li>
                                        <a href="#">Shoes (20)</a>
                                    </li>
                                    <li>
                                        <a href="#">Accessories (20)</a>
                                    </li>
                                    <li>
                                        <a href="#">Kids (20)</a>
                                    </li>
                                    <li>
                                        <a href="#">Kids (20)</a>
                                    </li>
                                    <li>
                                        <a href="#">Kids (20)</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseTwo">
                            Branding
                        </a>
                    </div>
                    <div
                        id="collapseTwo"
                        className="collapse show"
                        data-parent="#accordionExample"
                    >
                        <div className="card-body">
                            <div className="shop__sidebar__brand">
                                <ul>
                                    <li>
                                        <a href="#">Louis Vuitton</a>
                                    </li>
                                    <li>
                                        <a href="#">Chanel</a>
                                    </li>
                                    <li>
                                        <a href="#">Hermes</a>
                                    </li>
                                    <li>
                                        <a href="#">Gucci</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseThree">
                            Filter Price
                        </a>
                    </div>
                    <div
                        id="collapseThree"
                        className="collapse show"
                        data-parent="#accordionExample"
                    >
                        <div className="card-body">
                            <div className="shop__sidebar__price">
                                <ul>
                                    <li>
                                        <a href="#">$0.00 - $50.00</a>
                                    </li>
                                    <li>
                                        <a href="#">$50.00 - $100.00</a>
                                    </li>
                                    <li>
                                        <a href="#">$100.00 - $150.00</a>
                                    </li>
                                    <li>
                                        <a href="#">$150.00 - $200.00</a>
                                    </li>
                                    <li>
                                        <a href="#">$200.00 - $250.00</a>
                                    </li>
                                    <li>
                                        <a href="#">250.00+</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseFour">
                            Size
                        </a>
                    </div>
                    <div
                        id="collapseFour"
                        className="collapse show"
                        data-parent="#accordionExample"
                    >
                        <div className="card-body">
                            <div className="shop__sidebar__size">
                                <label htmlFor="xs">
                                    xs
                                    <input type="radio" id="xs" />
                                </label>
                                <label htmlFor="sm">
                                    s
                                    <input type="radio" id="sm" />
                                </label>
                                <label htmlFor="md">
                                    m
                                    <input type="radio" id="md" />
                                </label>
                                <label htmlFor="xl">
                                    xl
                                    <input type="radio" id="xl" />
                                </label>
                                <label htmlFor="2xl">
                                    2xl
                                    <input type="radio" id="2xl" />
                                </label>
                                <label htmlFor="xxl">
                                    xxl
                                    <input type="radio" id="xxl" />
                                </label>
                                <label htmlFor="3xl">
                                    3xl
                                    <input type="radio" id="3xl" />
                                </label>
                                <label htmlFor="4xl">
                                    4xl
                                    <input type="radio" id="4xl" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseFive">
                            Colors
                        </a>
                    </div>
                    <div
                        id="collapseFive"
                        className="collapse show"
                        data-parent="#accordionExample"
                    >
                        <div className="card-body">
                            <div className="shop__sidebar__color">
                                <label className="c-1" htmlFor="sp-1">
                                    <input type="radio" id="sp-1" />
                                </label>
                                <label className="c-2" htmlFor="sp-2">
                                    <input type="radio" id="sp-2" />
                                </label>
                                <label className="c-3" htmlFor="sp-3">
                                    <input type="radio" id="sp-3" />
                                </label>
                                <label className="c-4" htmlFor="sp-4">
                                    <input type="radio" id="sp-4" />
                                </label>
                                <label className="c-5" htmlFor="sp-5">
                                    <input type="radio" id="sp-5" />
                                </label>
                                <label className="c-6" htmlFor="sp-6">
                                    <input type="radio" id="sp-6" />
                                </label>
                                <label className="c-7" htmlFor="sp-7">
                                    <input type="radio" id="sp-7" />
                                </label>
                                <label className="c-8" htmlFor="sp-8">
                                    <input type="radio" id="sp-8" />
                                </label>
                                <label className="c-9" htmlFor="sp-9">
                                    <input type="radio" id="sp-9" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseSix">
                            Tags
                        </a>
                    </div>
                    <div
                        id="collapseSix"
                        className="collapse show"
                        data-parent="#accordionExample"
                    >
                        <div className="card-body">
                            <div className="shop__sidebar__tags">
                                <a href="#">Product</a>
                                <a href="#">Bags</a>
                                <a href="#">Shoes</a>
                                <a href="#">Fashio</a>
                                <a href="#">Clothing</a>
                                <a href="#">Hats</a>
                                <a href="#">Accessories</a>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>*/}
        </div>
    </>
}

const CategoriesArccodion: React.FC = () => {
    return <>
        <Accordion.Item className="card" eventKey="0">
            <Accordion.Header
                className="card-heading"
                as={'div'}
                bsPrefix={' '}>Categories</Accordion.Header>
            <Accordion.Body bsPrefix={"card-body"}>
                <div className="shop__sidebar__categories">
                    <ScrollContainer>

                        <ul className="nice-scroll">
                            <li>
                                <a href="#">Men (20)</a>
                            </li>
                            <li>
                                <a href="#">Women (20)</a>
                            </li>
                            <li>
                                <a href="#">Bags (20)</a>
                            </li>
                            <li>
                                <a href="#">Clothing (20)</a>
                            </li>
                            <li>
                                <a href="#">Shoes (20)</a>
                            </li>
                            <li>
                                <a href="#">Accessories (20)</a>
                            </li>
                            <li>
                                <a href="#">Kids (20)</a>
                            </li>
                            <li>
                                <a href="#">Kids (20)</a>
                            </li>
                            <li>
                                <a href="#">Kids (20)</a>
                            </li>
                        </ul>
                    </ScrollContainer>
                </div>
            </Accordion.Body>
        </Accordion.Item>
    </>
}

const SideBar: React.FC = () => {
    return <>
        <div className="col-lg-3">
            <div className="shop__sidebar">
                <SideBarSearch />
                <SideBarAccordion />
            </div>
        </div>
    </>
}

const PaginationBlock: React.FC<{ totalItems?: number, onPageChange?: (value: number) => void }> = (props) => {
    const { totalItems, onPageChange } = props
    return <>
        <div className="row">
            <div className="col-lg-12">
                <div className="product__pagination">
                    <PaginatedItems totalItems={totalItems} onPageChange={onPageChange} />
                </div>
            </div>
        </div>
    </>
}


const PaginatedItems: React.FC<{ totalItems?: number, onPageChange?: (value: number) => void }> = (props) => {
    const { totalItems = 0, onPageChange = () => { } } = props

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number }) => {
        onPageChange(event.selected)
    };


    return (
        <>
            <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={Math.ceil(totalItems / NUMOFITEMPERPAGE)}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}

                containerClassName="justify-content-center pagination"
                activeClassName="active"

                onPageChange={handlePageClick}
            />
        </>
    );
}


const ProductOption: React.FC<{ showingFilterResult?: ShowingFilterResult, onProductSort: (value: string) => void }> = (props) => {
    const { showingFilterResult, onProductSort } = props
    const options = [
        { text: "Low To High", value: "asc" },
        { text: "$0 - $55", value: "0-55" },
        { text: "$55 - $100", value: "55-100" }
    ]
    return <>
        <div className="shop__product__option">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="shop__product__option__left">
                        <p>{`Showing ${(showingFilterResult?.currentPage! - 1) * NUMOFITEMPERPAGE + 1}–${showingFilterResult?.numOfItems! + (showingFilterResult?.currentPage! - 1) * NUMOFITEMPERPAGE} of ${showingFilterResult?.totalItems} results`}</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="shop__product__option__right">
                        <p>Sort by Price:</p>
                        <NiceSelect
                            options={options}
                            handleChange={onProductSort} />
                    </div>
                </div>
            </div>
        </div>
    </>
}


const ProductSection: React.FC<{ productList: Product[] }> = (props) => {
    const dispatch = useDispatch()
    const { productList } = props

    const handleAddToCart = useCallback((productId: number) => {
        dispatch(addToCart({ id: productId, quantity: 1 }));
    }, [])



    const handleAddWishlist = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        console.log("add to wishlist")
    }

    return (
        <>
            <div className="row" >
                {productList?.map((product: Product) => {
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