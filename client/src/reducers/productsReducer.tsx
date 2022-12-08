
// Import the `RootState` type:
import { RootState } from "../store";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ProductId = number;

type productInCart = {
    id: ProductId;
    quantity: number
};

type ProductsState = {
    productsInCart: productInCart[],
    whishlists: number[],
    status: null,
    amount: number,
    limitItem: number,
    total: number
};

const initialState: ProductsState = {
    productsInCart: [],
    whishlists: [],
    status: null,
    amount: 0,
    limitItem: 0,
    total: 0
};

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        addToCart(state: ProductsState, action: PayloadAction<productInCart>) {
            const index = state.productsInCart.findIndex(
                ({ id }) => id === action.payload.id);

            if (index > -1) {
                state.productsInCart[index].quantity = state.productsInCart[index].quantity + action.payload.quantity;
            } else {
                state.productsInCart.push(action.payload)
            }
            localStorage.setItem('productsInCart', JSON.stringify(state.productsInCart));
        },
        toogleWishList(state: ProductsState, action: PayloadAction<ProductId>) {
            // console.log(action.payload)
        },
        removeItemCart(state: ProductsState, action: PayloadAction<ProductId>) {
            state.productsInCart = state.productsInCart.filter(p => {
                return p.id !== action.payload
            })
            localStorage.setItem('productsInCart', JSON.stringify(state.productsInCart));
        },
        updateCart(state: ProductsState, action: PayloadAction<productInCart>) {
            console.log(state.productsInCart)
            const newArr = state.productsInCart.map(product => {
                if (product.id === action.payload.id) {

                    return {
                        ...product,
                        quantity: action.payload.quantity
                    };
                }
                return product
            })
            state.productsInCart = newArr;
            localStorage.setItem('productsInCart', JSON.stringify(state.productsInCart));
        },
        setAmount(state: ProductsState, action: PayloadAction<ProductId>) {
            state.amount = action.payload
        },
        resetCart(state: ProductsState) {
            state.amount = 0
            state.productsInCart = []
        },
        setLimitItem(state: ProductsState, action: PayloadAction<number>) {
            state.limitItem = action.payload
        },
        setTotalItem(state: ProductsState, action: PayloadAction<number>) {
            state.total = action.payload
        }
    }

})

export const selectedProducts = (state: RootState) => {
    return state.products.productsInCart
};
export const getAmount = (state: RootState) => {
    return state.products.amount
};
export const getLimitItems = (state: RootState) => {
    return state.products.limitItem
};
export const getTotalItems = (state: RootState) => {
    return state.products.total
};
// Action creators are generated for each case reducer function
export const { addToCart, removeItemCart, updateCart, setAmount, resetCart, setLimitItem, setTotalItem } = productsSlice.actions



export default productsSlice.reducer 