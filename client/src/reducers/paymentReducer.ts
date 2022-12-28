import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BillingInfo, PaymentState } from 'models/types';
import { RootState } from "../store";

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
        addPromo(state: PaymentState, action: PayloadAction<number>) {
            state.discount = action.payload
        },
        addShipping(state: PaymentState, action: PayloadAction<number>) {
            state.shipping = action.payload
        },
        setBillingInfo(state: PaymentState, action: PayloadAction<BillingInfo>) {
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