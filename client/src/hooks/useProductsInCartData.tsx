
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { request } from 'utilities/axios-utils'
import { useId } from 'react'

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

const fetchProduct = (urlparams: string) => {
    if (urlparams !== '')
        return request({ url: `/products?${urlparams}` })

}

const addOrder = (order: order) => {
    return request({
        url: `/orders`,
        method: 'post',
        data: order
    })
}
const updatePaymentStatus = (order: order) => {
    return request({
        url: `/orders/${order.id}`,
        method: 'PATCH',
        data: {
            paymentStatus: order.paymentStatus
        }
    })
}
export const useProductsInCartData = (urlParams: string, onSuccess = () => { }, onError = () => { }) => {
    const queryClient = useQueryClient()
    return useQuery(
        ['products-in-cart', urlParams],
        () => fetchProduct(urlParams),
        {
            onSuccess,
            onError,
            select: (data) => {
                return data?.data?.map((product: any) => (({ id, price, title, image }) => ({ id, price, title, image }))(product))
            },
            initialData: () => {
                const productsInCart = queryClient.getQueriesData('products-in-cart')
                if (productsInCart) return productsInCart
                else return undefined
            }
        }
    )
}

export const useCreateOrderData = () => {
    const queryClient = useQueryClient()
 
    return useMutation( {
        mutationFn: addOrder,
        onSuccess: async (data, context) => {
            localStorage.setItem("orderID", data.data.id)
        },
        onError: async (data, context) => {
            console.log(data);
        } 
    })
}

export const useUpdatePaymentStatusData = () => {
    return useMutation(updatePaymentStatus)
}


