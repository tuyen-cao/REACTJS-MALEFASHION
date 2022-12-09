import { useQuery } from 'react-query'
import { request } from 'utilities/axios-utils'

const url = '/products'

export const fetchProduct = (urlparams: string) => {
    if (urlparams !== '')
        return request({
            url: url + `?${urlparams}`,
            method: 'get',
            headers: {
                'Test-Header': 'test-value'
            }
        })
}
