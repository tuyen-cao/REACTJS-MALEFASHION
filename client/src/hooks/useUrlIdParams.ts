import { BasketItem, Product } from "models/types";

export const useUrlIdParams = (urlParams: BasketItem[]) => {
    let params = '';
    if(urlParams) {
        urlParams.map((p: BasketItem) => {
            params += `&id=${p.id}`
        })
        return params.substring(1)
    }
    return ""
        
}