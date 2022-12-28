
import { Product } from 'models/types';
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { addOrder, updatePaymentStatus } from 'services/payment.service';
import { fetchProduct } from 'services/product.service';


export const useProductsInCartData = (urlParams: string, onSuccess = () => { }, onError = () => { }) => {
    const queryClient = useQueryClient()
    return useQuery(
        ['products-in-cart', urlParams],
        () => fetchProduct(urlParams),
        {
            onSuccess,
            onError,
            select: (data) => {
                return data?.data?.map((product: Product) => (({ id, price, title, image }) => ({ id, price, title, image }))(product))
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

    return useMutation({
        mutationFn: addOrder,
        onSuccess: async (data, context) => {
            localStorage.setItem("orderID", JSON.stringify(data.data))
        },
        onError: async (data, context) => {
            console.log(data);
        }
    })
}

export const useUpdatePaymentStatusData = () => {
    return useMutation(updatePaymentStatus)
}

