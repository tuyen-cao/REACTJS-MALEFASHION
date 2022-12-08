import {  useQuery } from 'react-query'
import { request } from 'utilities/axios-utils'

export const GetProduct = () => {
    return useQuery(
        'products',
        () => { return request({ url: '/products?_expand=productType&productTypeId_ne=0' }) },
        {
            select: (data) => {
                const newProducts = data.data.map((product: any) => {
                    return { ...product, type: product.productType.type }
                })
                return newProducts
            }
        }
    )
}