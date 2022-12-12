import { useQuery, useQueryClient } from 'react-query'
import { request } from 'utilities/axios-utils'

export const GetProduct = () => {
    const queryClient = useQueryClient()
    return useQuery(
        'products',
        () => {
            return request({ url: '/products?_expand=productType&productTypeId_ne=0' })
        },
        {
            select: (data) => {
                console.log(data)
                const newProducts = data?.data?.map((product: any) => {
                    return { ...product, type: product.productType.type }
                })
                return newProducts
            }
            ,
            onSuccess: () => {
                console.log("onSuccess")
            },
            onError: (_error) => {
                console.log(_error)
            },
            initialData: () => {
                const products = queryClient.getQueriesData('products')
                if (products) return products
                else return undefined
            }
        }
    )
}