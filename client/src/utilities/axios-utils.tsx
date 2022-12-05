import axios from 'axios'

const client = axios.create(
    {
        baseURL: 'http://localhost:4500/'
    }
)

export const request = ({...options}) => {
  client.defaults.headers.common.Authorization = "Bearer token"
  const onSuccess = (response:any) => response
  const onError = (error:any) => {
    //optionally catch errors and ass additional logging here
    return error
  }
  return client(options).then(onSuccess).catch(onError)
}

