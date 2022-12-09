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
        url: url,
        method: 'post',
        data: order
    })
}

export const updatePaymentStatus = (order: order) => {
    return request({
        url: `${url}${order.id}`,
        method: 'PATCH',
        data: {
            paymentStatus: order.paymentStatus
        }
    })
}