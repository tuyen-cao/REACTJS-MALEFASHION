import { API_CONSTANTS } from 'constants/api.constant'
import { REQUEST_METHOD } from 'constants/methodRequest.constant'
import { useQuery } from 'react-query'
import { request } from 'utilities/axios-utils'

const url = '/orders'
type product = {
    productId: number
}

type order = {
    id?: number;
    products?: product[],
    total?: number,
    discountedTotal?: number,
    totalQuantity?: number,
    paymentStatus?: string
};


export const addOrder = (order: order) => {
    return request({
        url: API_CONSTANTS.API_ADD_ODER,
        method: REQUEST_METHOD.POST,
        data: order
    })
}

export const updatePaymentStatus = (order: order) => {
    const orderId: string = order.id !== undefined ? order.id.toString() : '';
    return request({
        url: API_CONSTANTS.API_UPDATE_PAYMENT_STATUS.replace('{orderId}',   orderId),
        method: REQUEST_METHOD.PATCH,
        data: {
            paymentStatus: order.paymentStatus
        }
    })
}

export const fetchPromocodes = (promocode: string) => {
    if (promocode !== '')
        return request({
            url: API_CONSTANTS.API_GET_PROMO_CODE.replace('{promocode}',promocode),
            method: REQUEST_METHOD.GET
        })
}

