import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type } from '@testing-library/user-event/dist/type';
import { RootState } from "../store";

type discount = number;
type shipping = number;
type billingInfo = {
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
type PaymentState = {
    discount: number,
    shipping: number,
    billingInfo: billingInfo
};

const initialState: PaymentState = {
    discount: 0,
    shipping: 0,
    billingInfo: {
        firstName: '',
        lastName: '',
        country: '',
        email: '',
        address: '',
        addressapartment: '',
        city: '',
        state: '',
        zipcpde: '',
        phone: '',
        acc: false,
        diffAcc: false,
        password: '',
        orderNote: '',
        paymentmethod: '',
    }
};

export const paymentSlice = createSlice({
    name: 'payment',
    initialState: initialState,
    reducers: {
        addPromo(state: PaymentState, action: PayloadAction<discount>) {
            state.discount = action.payload
        },
        addShipping(state: PaymentState, action: PayloadAction<shipping>) {
            state.shipping = action.payload
        },
        setBillingInfo(state: PaymentState, action: PayloadAction<billingInfo>) {
            state.billingInfo = {...state.billingInfo,  ...action.payload}
        },
    }

})

export const getPromo = (state: RootState) => {
    return state.payment.discount
};
export const getBillingInfo = (state: RootState) => {
    return state.payment.billingInfo
};

// Action creators are generated for each case reducer function
export const { addPromo, addShipping, setBillingInfo } = paymentSlice.actions



export default paymentSlice.reducer 