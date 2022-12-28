import { API_CONSTANTS } from 'constants/api.constant'
import { REQUEST_METHOD } from 'constants/methodRequest.constant'
import { request } from 'utilities/axiosUtils'

export const fetchProduct = (urlparams: string) => {
    return request({
        url: API_CONSTANTS.API_GET_PRODUCTS + `?${urlparams}`,
        method: REQUEST_METHOD.GET,
        headers: {
            'Test-Header': 'test-value'
        }
    })
}

export const fetchAllCategoriesIncludeProducts = () => {
    return request({
        url: API_CONSTANTS.API_GET_ALL_CATEGORIES_INCLUDE_PRODUCTS,
        method: REQUEST_METHOD.GET
    })
}
