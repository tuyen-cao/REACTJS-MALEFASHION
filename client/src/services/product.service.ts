import { REQUEST_METHOD } from 'constants/methodRequest.constant'
import { useQuery } from 'react-query'
import { request } from 'utilities/axiosUtils'

const url = '/products'

export const fetchProduct = (urlparams: string) => {
    if (urlparams !== '')
        return request({
            url: url + `?${urlparams}`,
            method: REQUEST_METHOD.GET,
            headers: {
                'Test-Header': 'test-value'
            }
        })
}
