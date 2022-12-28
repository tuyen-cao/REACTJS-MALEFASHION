export const API_CONSTANTS = {
    API_ADD_ODER: '/orders',
    API_UPDATE_PAYMENT_STATUS: '/orders/{orderId}',
    API_GET_PROMO_CODE: `/promoCodes?code={promocode}`,
    API_GET_ALL_CATEGORIES_INCLUDE_PRODUCTS: '/categories?_embed=products',
    API_GET_PRODUCTS: '/products'
}
export const URLPARAMS = {
    ALLPRODUCTTYPES: '_expand=productType&productTypeId_ne=0',
    ALLPRODUCTTYPESLIMITED: '_expand=productType&productTypeId_ne=0&_limit=8/productTypes',
    PRODUCTFILTER: '_limit={limit}&_page={page}&{range}&{categoryId}',
}