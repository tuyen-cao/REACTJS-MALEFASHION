type Rating = {
    rate: number,
    count: number
}

type Product = {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    type: string,
    rating: Rating
}


export type BillingInfo = {
    firstName?: string,
    lastName?: string,
    country?: string,
    email?: string,
    address?: string,
    addressapartment?: string,
    city?: string,
    state?: string,
    zipcpde?: string,
    phone?: string,
    acc?: boolean,
    password?: string,
    diffAcc?: boolean,
    orderNote?: string,
    paymentmethod?: string,
}


export type PromoCodeFormValues = {
    promocode: string,
};

export type PromoCodeProps = {
    hasRef?: boolean
}

export type RatingProps = {
    rating: Rating
}

export type InputFieldProps = {
    field: {
        name: string,
        value: string,
        onChange: () => void,
        onBlur: () => void,
        error: string
    },
    form: {
        errors: any,
        touched: any
    },

    type: string,
    label?: string,
    placeholder?: string,
    disabled?: boolean,
    required?: boolean,
    checked?: boolean,
}

export type ProductProps = {
    product: Product,
    handleAddToCart: (productId: number) => void,
    handleAddWishlist: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

export type ProductInCartProps = {
    product: Product,
    children?: React.ReactNode,
    handleQuantityChange: () => {}
}

export type BasketItem = {
    id: number;
    quantity: number
}

export type Order = {
    id?: number;
    products?: number[],
    total?: number,
    discountedTotal?: number,
    totalQuantity?: number,
    paymentStatus?: string
}

export type ProductsState = {
    productsInCart: BasketItem[],
    whishlists: number[],
    status: null,
    amount: number,
    limitItem: number,
    total: number
}

export type PaymentState = {
    discount: number,
    shipping: number,
    billingInfo: BillingInfo
};
