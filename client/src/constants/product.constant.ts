export const PRODUCTTYPES = { 
    BEST_SELLERS: "best sellers",
}
export const URLPARAMS = {
    ALLPRODUCTTYPES: '_expand=productType&productTypeId_ne=0',
    ALLPRODUCTTYPESLIMITED: '_expand=productType&productTypeId_ne=0&_limit=8/productTypes',
    PRODUCTFILTER: '_limit={limit}&_page={page}&{range}'
}
export const NUMOFITEMPERPAGE = 12