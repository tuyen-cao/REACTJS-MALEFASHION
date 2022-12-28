import { API_CONSTANTS } from 'constants/api.constant'
import { REQUEST_METHOD } from 'constants/methodRequest.constant'
import { Order } from 'models/types'
import { request } from 'utilities/axiosUtils'


export const addOrder = (order: Order) => {
    return request({
        url: API_CONSTANTS.API_ADD_ODER,
        method: REQUEST_METHOD.POST,
        data: order
    })
}

export const updatePaymentStatus = (order: Order) => {
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

