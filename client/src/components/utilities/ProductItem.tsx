import Rating from "../Rating"
import styled from 'styled-components'
import { PRODUCTTYPES } from "constants/product.constant"
import { id } from "postcss-selector-parser"

type ProductProps = {
    product: {
        id: number,
        title: string,
        price: number,
        description: string,
        category: string,
        image: string,
        type: string,
        rating: {
            rate: number,
            count: number
        },
    },
    handleAddToCart: (productId: number) => void,
    handleAddWishlist: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}
const ProductItem = (props: ProductProps) => {
    const rating = props.product.rating,
        product = props.product
    const handleAddToCart = () => {
        props.handleAddToCart(product.id)
    }
    return (
        <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix">
            <ProductItemStyled className="product__item">
                <ThumbnailStyled
                    className="product-item__pic set-bg"
                >    <Thumbnail alt={product.title}
                    src={product.image} />
                    {props.product.type !== PRODUCTTYPES.BEST_SELLERS
                        ? <span className="label">{product.type}</span>
                        : null}
                    <ul className="product__hover">
                        <li>
                            <button
                                onClick={props.handleAddWishlist}>
                                <img src="img/icon/heart.png" alt="" />
                            </button>
                        </li>
                        <li>
                            <a href="#">
                                <img src="img/icon/compare.png" alt="" />{" "}
                                <span>Compare</span>
                            </a>
                        </li>
                    </ul>
                </ThumbnailStyled>
                <div className="product-item__text">
                    <h6>{product.title}</h6>
                    <AddToCartStyled className="add-cart"
                        onClick={handleAddToCart}>
                        + Add To Cart
                    </AddToCartStyled>
                    <Rating rating={rating} />
                    <h5>${product.price}</h5>
                    <div className="product__color-select">
                        <label htmlFor="pc-1">
                            <input type="radio" id="pc-1" />
                        </label>
                        <label className="active black" htmlFor="pc-2">
                            <input type="radio" id="pc-2" />
                        </label>
                        <label className="grey" htmlFor="pc-3">
                            <input type="radio" id="pc-3" />
                        </label>
                    </div>
                </div>
            </ProductItemStyled>
        </div>
    )
}

export default ProductItem


const ThumbnailStyled = styled.div`
    background: #f1f1f1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Thumbnail = styled.img`
    max-height: 180px;
    object-fit: cover;
    max-width: 80%;
`;

const ProductItemStyled = styled.div`
    &:hover {
        .add-cart {
            top: 22px;
            opacity: 1;
            visibility: visible;
        }
    }
    button {
        border:0;
        outline:0;
        padding: 0;
        margin: 0;
        background: none;
    }
`;

const AddToCartStyled = styled.button`
    font-size: 15px;
    color: #e53637;
    font-weight: 700;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    visibility: hidden;
    -webkit-transition: all, 0.3s;
    -o-transition: all, 0.3s;
    transition: all, 0.3s;
`;
